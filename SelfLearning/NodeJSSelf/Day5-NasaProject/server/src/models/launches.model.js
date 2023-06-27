const launches = new Map();
const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const axios = require('axios');
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-452 b',
    destination: 'Kepler-452 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
};

const SPACEX_API_URL = "https://api.spacexdata.com/v5/launches/query";

async function populateLaunches() {
    const response =  await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1,
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1,
                    }
                }

            ]
        }
    });

    if(response.status !== 200){
        console.log("Problem download data launch");
        throw new Error("Error Loading Dat");
    }

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payloads['customers']
        });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: customers,
        };

        console.log(`${launch.flightNumber}  ${launch.mission}`);

        await saveLaunch(launch);
    }
}
async function loadLaunchesData(){
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon',
        mission: 'FalconSat'
    })

    if(firstLaunch){
        console.log('Data is already loaded');
        return;
    } else {
        await populateLaunches();
    }

}

async function getAllLaunches() {
    return launchesDatabase.find({}, {
        '_id': 0,
        '__v': 0
    }).skip(20).limit(50);
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');

    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function saveLaunch(launch){
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    })
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    });

    if(!planet){
        throw new Error("No matching planet found");
    }

    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customer: ['Zero To Master', 'NASA'],
        flightNumber: newFlightNumber
    })

    await saveLaunch(newLaunch);
}

async function findLaunch(filter){
    return launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId){
    return await findLaunch({
        flightNumber: launchId,
    });
}

async function abortLaunchById(launchId){
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    loadLaunchesData,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
}

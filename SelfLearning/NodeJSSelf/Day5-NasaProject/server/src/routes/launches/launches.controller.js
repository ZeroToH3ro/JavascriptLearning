const { getAllLaunches, abortLaunchById, scheduleNewLaunch, existsLaunchWithId} = require('../../models/launches.model');
const { getPagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
    console.log(req.query);

    const {skip, limit} = getPagination(req.query);
    const launch = await getAllLaunches(skip, limit);
    return res.status(200).json(launch);
}

async function httpAddNewLaunches(req, res) {
    const launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: "Missing required launch property"
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: "Invalid Date"
        });
    }

    await scheduleNewLaunch(launch);

    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    const existsLaunch = await existsLaunchWithId(launchId);

    if(!existsLaunch){
        return res.status(404).json({
            err: "Not found",
        })
    }

    const aborted = await abortLaunchById(launchId);
    console.log("Value of aborted: ", aborted);
    if(!aborted){
        return res.status(404).json({
            err: "Launch not aborted",
        })
    }
    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAbortLaunch
};


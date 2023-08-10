const express = require('express');
const { Kafka } = require('kafkajs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

var array = new Array();
var a = new Array();
a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var lat1 = 0,
    lat2 = 0,
    lat3 = 0,
    lat4 = 0,
    lat5 = 0,
    lat6 = 0,
    lat7 = 0,
    lat8 = 0,
    lat9 = 0,
    lat10 = 0,
    lat11 = 0,
    lat12 = 0,
    lat13 = 0,
    lat14 = 0;
var lon1 = 0,
    lon2 = 0,
    lon3 = 0,
    lon4 = 0,
    lon5 = 0,
    lon6 = 0
lon7 = 0,
    lon8 = 0;
var lon9 = 0,
    lon10 = 0,
    lon11 = 0,
    lon12 = 0,
    lon13 = 0,
    lon14 = 0;

const kafka = new Kafka({
    clientId: 'asmgcs-dev',
    brokers: ['34.141.139.163:9093'],
});

const topic = 'asmgcs'
const consumer = kafka.consumer({
    groupId: 'asmgcs-group'
});

consumer.connect()
consumer.subscribe({ topic })
const run = async() => {
    console.log("its running")
    try {
        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                const v = JSON.parse(message.value.toString())

                if (array.length == 56) {
                    array = [];
                }

                array.push(v.I041.Lat.val);
                array.push(v.I041.Lon.val);

                // if (v.I220.TAddr.val == "8013AE") {
                //     lat1 = v.I041.Lat.val;
                //     lon1 = v.I041.Lon.val;
                // }
                // if (v.I220.TAddr.val == "800D6D") {
                //     lat2 = v.I041.Lat.val;
                //     lon2 = v.I041.Lon.val;
                // } else if (v.I220.TAddr.val == "80089B") {
                //     lat3 = v.I041.Lat.val;
                //     lon3 = v.I041.Lon.val;
                // } else if (v.I220.TAddr.val == "8008A0") {
                //     lat4 = v.I041.Lat.val;
                //     lon4 = v.I041.Lon.val;
                // } else if (v.I220.TAddr.val == "75029E") {
                //     lat5 = v.I041.Lat.val;
                //     lon5 = v.I041.Lon.val;
                // } else if (v.I220.TAddr.val == "8008B2") {
                //     lat6 = v.I041.Lat.val;
                //     lon6 = v.I041.Lon.val;
                // } else if (v.I220.TAddr.val == "80043F") {
                //     lat7 = v.I041.Lat.val;
                //     lon7 = v.I041.Lon.val;
                // } else if (v.I220.TAddr.val == "80089B") {
                //     lat8 = v.I041.Lat.val;
                //     lon8 = v.I041.Lon.val;
                // } else if (v.I220.TAddr.val == "80089A") {
                //     lat9 = v.I041.Lat.val;
                //     lon9 = v.I041.Lon.val;
                // } else if (v.I220.TAddr.val == "800CC3") {
                //     lat10 = v.I041.Lat.val;
                //     lon10 = v.I041.Lon.val;
                // } else if (v.I220.TAddr.val == "801569") {
                //     lat11 = v.I041.Lat.val;
                //     lon12 = v.I041.Lon.val;
                // } else if (v.I220.TAddr.val == "8008A2") {
                //     lat13 = v.I041.Lat.val;
                //     lon13 = v.I041.Lon.val;
                // } else if (v.I220.TAddr.val == "801400") {
                //     lat14 = v.I041.Lat.val;
                //     lon14 = v.I041.Lon.val;
                // }




                console.log({
                    partition,
                    offset: message.offset,
                    array,
                    //category: message.value[0].category,
                })


            }
        });

    } catch (error) {
        console.log(error);
    }
};
run();
app.get("/input", (req, res) => {
    if (array.length >= 28) {
        res.json(array);
    } else {
        res.json(a);
    }



})




app.listen(5000, () => {
    console.log('server is running');
})
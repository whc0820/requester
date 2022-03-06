const parse = require('node-html-parser').parse;
const axios = require('axios').default;

const HOST_URL = 'https://ecsos.moe.edu.tw/platform/project/one/2544';

let timeSpent = 0;

const request = () => {
    axios.get(HOST_URL)
        .then(function (response) {
            let root = parse(response.data);
            let target = root.querySelector('.project-one-info > div:nth-child(2)');
            let pop = target.textContent.split(':')[1].replace(/\s/g, '');

            let date = new Date();
            let randomNum = Math.floor(Math.random() * (19 - 10 + 1) + 10);
            console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} -> ${pop} (${timeSpent}s)`);
            
            timeSpent = randomNum;
            setTimeout(request, randomNum * 1000);
        })
        .catch(function (error) {
            console.log(error);
            setTimeout(request, 10000);
        });
}

request();
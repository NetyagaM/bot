
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fetch = require('node-fetch');

const prefix = "!";

client.on('message', message =>{
//

    if (message.content.indexOf(prefix) !== 0) {
        return;
    } else if (message.content.startsWith(prefix + 'погода')) {
        target = message.content.split(' ').slice(1).join(' ');
        console.log(target);
        //message.channel.send(`Ищу ${target}`);
        response(target);// Значение города

        function response(searchItem) {
            const addId ='2c9989571c4c28ed722708c0c32180b0';
            const units = 'metric';
            const lang = 'ru';
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchItem}&appid=${addId}&units=${units}&=${lang}`)
                .then(result => {
                    return result.json();
                }).then(result => {
                    init(result);

                    timeZone = result.timezone / 3600;
                    if (timeZone > 0) {
                        timeZone = "+" + timeZone;
                    } else {
                        timeZone;
                    }
                    
                    const embed = new Discord.RichEmbed()
                        .setAuthor(`Погода ${result.name}`)
                        .setThumbnail(`http://openweathermap.org/img/wn/${result.weather}@2x.png`)
                        .setColor(0x00AE86)
                        .addField('Часовой пояс',`${timeZone} GMT`, true)
                        .addField('Температура', `${result.main.temp} ℃`, true)
                        .addField('Влажность', `${result.main.humidity} %`, true);
                        message.channel.send({embed});
                });
        }

        function init(result) {
            console.log(result);
            //console.log(result.main.temp);
            //console.log(result.weather[0].description);
        } 

        //message.channel.send(result.json());  
    }
});

client.login(config.token);
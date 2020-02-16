
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
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchItem)}&appid=${addId}&units=${units}&=lang=${lang}`)
                .then(result => {
                    return result.json();
                }).then(result => {
                    init(result);

                    timeZone = result.timezone / 3600; //   Преобразование часового пояса из сек. в часы.
                    if (timeZone > 0) {
                        timeZone = "+" + timeZone;
                    } else {
                        timeZone;
                    }

                    let icons = result.weather[0].icon; // Получаем иконку погоды

                    const embed = new Discord.RichEmbed() // Формирование формы для вывода погоды
                        .setAuthor(`Погода ${result.name}`)
                        .setThumbnail(`http://openweathermap.org/img/wn/${icons}@2x.png`)
                        .setColor(0x00AE86)
                        .addField('Часовой пояс',`${timeZone} GMT`, true)
                        .addField('Температура', `${result.main.temp} ℃`, true)
                        .addField('Влажность', `${result.main.humidity} %`, true);
                        message.channel.send({embed});
                });
        }

        function init(result) {
            console.log(result);
        } 
    }
});

client.login(config.token);
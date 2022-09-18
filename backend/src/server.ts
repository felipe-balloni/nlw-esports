import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHoursStringToMinutes } from './utils/convert-hours-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173'
    })
);

const prisma = new PrismaClient();

/**
 * HTTP Methods / API Restful/ HTTP Codes
 *
 * Query Params: request.query (Filtros, ordenação, paginação, ...)
 * Route Params: request.params (Identificar um recurso na alteração ou remoção)
 * Body: request.body (Dados para criação ou alteração de um registro)
 */

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
    return response.json(games);
});

app.post('/games', async (request, response) => {
    interface Game {
        name: string;
        bannerUrl: string;
    }

    const games: Game[] = request.body;

    // const games: Game[] = [
    //     {
    //         name: 'Valorant',
    //         bannerUrl:
    //             'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg'
    //     },
    //     {
    //         name: 'League of Legends',
    //         bannerUrl:
    //             'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-285x380.jpg'
    //     },
    //     {
    //         name: 'Dota 2',
    //         bannerUrl:
    //             'https://static-cdn.jtvnw.net/ttv-boxart/Dota%202-285x380.jpg'
    //     },
    //     {
    //         name: 'Counter-Strike: Global Offensive',
    //         bannerUrl:
    //             'https://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike:%20Global%20Offensive-285x380.jpg'
    //     },
    //     {
    //         name: 'Overwatch',
    //         bannerUrl:
    //             'https://static-cdn.jtvnw.net/ttv-boxart/Overwatch-285x380.jpg'
    //     },
    //     {
    //         name: 'Apex Legends',
    //         bannerUrl:
    //             'https://static-cdn.jtvnw.net/ttv-boxart/Apex%20Legends-285x380.jpg'
    //     },
    //     {
    //         name: 'Fortnite',
    //         bannerUrl:
    //             'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-285x380.jpg'
    //     },
    //     {
    //         name: 'Teamfight Tactics',
    //         bannerUrl:
    //             'https://static-cdn.jtvnw.net/ttv-boxart/Teamfight%20Tactics-285x380.jpg'
    //     },
    //     {
    //         name: 'Fall Guys',
    //         bannerUrl:
    //             'https://static-cdn.jtvnw.net/ttv-boxart/Fall%20Guys:%20Ultimate%20Knockout-285x380.jpg'
    //     }
    // ];

    const gameIds = await Promise.all(
        games.map(async game => {
            const gameExists = await prisma.game.findFirst({
                where: {
                    name: game.name
                }
            });

            if (gameExists) {
                return gameExists;
            }

            return await prisma.game.create({
                data: {
                    name: game.name,
                    bannerUrl: game.bannerUrl
                }
            });

        })
    );

    return response.status(201).json(gameIds);
});

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            hoursStart: true,
            hoursEnd: true
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    response.json(
        ads.map(ad => ({
            ...ad,
            weekDays: ad.weekDays.split(','),
            hoursStart: convertMinutesToHourString(ad.hoursStart),
            hoursEnd: convertMinutesToHourString(ad.hoursEnd)
        }))
    );
});

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;

    //TODO validation with Zod library

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            weekDays: body.weekDays.join(','),
            discordId: body.discordId, //TODO it could be unique
            useVoiceChannel: body.useVoiceChannel,
            hoursStart: convertHoursStringToMinutes(body.hoursStart), //TODO check if it's a valid time and hoursStart < hoursEnd
            hoursEnd: convertHoursStringToMinutes(body.hoursEnd)
        }
    });

    return response.status(201).json(ad);
});

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discordId: true
        },
        where: {
            id: adId
        }
    });

    response.json({ discord: ad.discordId });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

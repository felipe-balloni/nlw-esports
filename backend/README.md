# Backend

## Entidades

### Games

* id
* title
* bannerUrl

### Ad

* id
* gameId
* name
* yearsPlaying
* discord
* weekDays
* hoursStart
* hoursEnd
* useVoiceChannel
* Created_at

### Casos de uso

1. [x] Listagem dos games com a quantidade de anúncios;
2. [x] Cadastro de um ad;
3. [x] Listagem dos ads de um game;
4. [x] Buscar discord pelo id do ad;

## TODO'S
- Cadastro de um game;
- Integrar o login com o discord;
- Criar uma entidade para usuário com perfil do discord;
- editar/excluir Ads;
- Pensar num tipo de throttle para evitar flood de ads, com cors será que precisa?
- Validar cadastramento de ads, sugerido Zod como biblioteca de validação;
- Pensar no campo discordId se não poderia ser **único** por gameId

## Games cadastrados
Valorant https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg
League of Legends https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg
Dota 2 https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg
CS:GO https://static-cdn.jtvnw.net/ttv-boxart/32399-285x380.jpg
Overwatch https://static-cdn.jtvnw.net/ttv-boxart/488552-285x380.jpg
Apex Legends https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg
Fortnite https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg
Teamfight Tactics https://static-cdn.jtvnw.net/ttv-boxart/513143-285x380.jpg
Fall Guys https://static-cdn.jtvnw.net/ttv-boxart/509658-285x380.jpg

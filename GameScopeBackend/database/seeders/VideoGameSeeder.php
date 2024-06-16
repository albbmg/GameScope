<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VideoGame;

class VideoGameSeeder extends Seeder
{
    public function run()
    {
        $realGames = [
            [
                'name' => 'The Legend of Zelda: Breath of the Wild',
                'developer' => 'Nintendo',
                'description' => 'Un juego de acción y aventuras ambientado en un mundo abierto con gráficos impresionantes y una jugabilidad innovadora. Acompaña a Link en su viaje para salvar Hyrule.',
                'genre' => 'Acción-aventura',
                'platform' => 'Nintendo Switch',
                'release_year' => 2017,
                'image' => '/assets/images/video_games/zelda_breath_of_the_wild.jpg',
                'is_favorite' => false,
                'graphics' => 5.8,
                'gameplay' => 7.9,
                'story' => 9.7
            ],
            [
                'name' => 'God of War',
                'developer' => 'Santa Monica Studio',
                'description' => 'Un juego de acción y aventuras en tercera persona que sigue la historia de Kratos y su hijo Atreus en una emocionante saga de mitología nórdica.',
                'genre' => 'Acción-aventura',
                'platform' => 'PlayStation 4',
                'release_year' => 2018,
                'image' => '/assets/images/video_games/god_of_war.webp',
                'is_favorite' => true,
                'graphics' => 9.9,
                'gameplay' => 8,
                'story' => 7
            ],
            [
                'name' => 'Red Dead Redemption 2',
                'developer' => 'Rockstar Games',
                'description' => 'Un juego de acción y aventuras ambientado en un mundo abierto. Vive la vida de un forajido en el salvaje oeste con una historia cautivadora y un vasto mundo para explorar.',
                'genre' => 'Acción-aventura',
                'platform' => 'Multiple',
                'release_year' => 2018,
                'image' => '/assets/images/video_games/red_dead_redemption_2.webp',
                'is_favorite' => false,
                'graphics' => 9,
                'gameplay' => 9.6,
                'story' => 6
            ],
            [
                'name' => 'The Witcher 3: Wild Hunt',
                'developer' => 'CD Projekt Red',
                'description' => 'Un juego de rol en un mundo abierto ambientado en un mundo de fantasía medieval. Acompaña a Geralt de Rivia en su búsqueda para encontrar a su hija adoptiva.',
                'genre' => 'RPG',
                'platform' => 'Multiple',
                'release_year' => 2015,
                'image' => '/assets/images/video_games/the_witcher_3.webp',
                'is_favorite' => true,
                'graphics' => 7,
                'gameplay' => 8,
                'story' => 5
            ],
            [
                'name' => 'Horizon Zero Dawn',
                'developer' => 'Guerrilla Games',
                'description' => 'Un juego de rol de acción ambientado en un mundo post-apocalíptico donde los humanos cazan máquinas en un paisaje bellamente realizado.',
                'genre' => 'RPG de acción',
                'platform' => 'PlayStation 4',
                'release_year' => 2017,
                'image' => '/assets/images/video_games/horizon_zero_dawn.webp',
                'is_favorite' => true,
                'graphics' => 10,
                'gameplay' => 8,
                'story' => 7
            ],
            [
                'name' => 'Spider-Man',
                'developer' => 'Insomniac Games',
                'description' => 'Un juego de acción y aventuras protagonizado por Spider-Man de Marvel. Balancéate por Nueva York y enfréntate a enemigos icónicos en esta emocionante aventura.',
                'genre' => 'Acción-aventura',
                'platform' => 'PlayStation 4',
                'release_year' => 2018,
                'image' => '/assets/images/video_games/spider_man.webp',
                'is_favorite' => false,
                'graphics' => 7,
                'gameplay' => 9.7,
                'story' => 6
            ],
            [
                'name' => 'Cyberpunk 2077',
                'developer' => 'CD Projekt Red',
                'description' => 'Una historia de acción y aventuras de mundo abierto ambientada en Night City. Explora un mundo futurista lleno de posibilidades y desafíos.',
                'genre' => 'RPG',
                'platform' => 'Multiple',
                'release_year' => 2020,
                'image' => '/assets/images/video_games/cyberpunk_2077.webp',
                'is_favorite' => false,
                'graphics' => 10,
                'gameplay' => 7,
                'story' => 5
            ],
            [
                'name' => 'GTA V',
                'developer' => 'Rockstar North',
                'description' => 'Un juego de acción y aventuras ambientado en un mundo abierto. Vive la vida de tres criminales en Los Santos mientras planean y ejecutan atrevidos robos.',
                'genre' => 'Acción-aventura',
                'platform' => 'Multiple',
                'release_year' => 2013,
                'image' => '/assets/images/video_games/gta_v.webp',
                'is_favorite' => true,
                'graphics' => 8,
                'gameplay' => 9.8,
                'story' => 6
            ],
            [
                'name' => 'Assassin\'s Creed Odyssey',
                'developer' => 'Ubisoft',
                'description' => 'Un RPG de acción de mundo abierto ambientado en la antigua Grecia. Embárcate en una épica aventura como un mercenario y forja tu destino en un mundo en guerra.',
                'genre' => 'RPG de acción',
                'platform' => 'Multiple',
                'release_year' => 2018,
                'image' => '/assets/images/video_games/assassins_creed_odyssey.webp',
                'is_favorite' => false,
                'graphics' => 9.6,
                'gameplay' => 9.5,
                'story' => 9.4
            ],
            [
                'name' => 'Fortnite',
                'developer' => 'Epic Games',
                'description' => 'Un juego de battle royale con mecánicas de construcción. Compite en el último hombre en pie y construye estructuras para ganar ventaja.',
                'genre' => 'Battle Royale',
                'platform' => 'Multiple',
                'release_year' => 2017,
                'image' => '/assets/images/video_games/fortnite.webp',
                'is_favorite' => false,
                'graphics' => 9.2,
                'gameplay' => 9.3,
                'story' => 8.9
            ],
            [
                'name' => 'Minecraft',
                'developer' => 'Mojang',
                'description' => 'Un juego de sandbox con elementos de construcción, supervivencia y aventuras. Crea y explora mundos generados aleatoriamente con recursos ilimitados.',
                'genre' => 'Sandbox',
                'platform' => 'Multiple',
                'release_year' => 2011,
                'image' => '/assets/images/video_games/minecraft.webp',
                'is_favorite' => true,
                'graphics' => 8.8,
                'gameplay' => 9.8,
                'story' => 9.0
            ],
            [
                'name' => 'Overwatch',
                'developer' => 'Blizzard Entertainment',
                'description' => 'Un juego de disparos en primera persona basado en equipos. Elige entre una variedad de héroes únicos y compite en combates estratégicos por objetivos.',
                'genre' => 'Disparos en primera persona',
                'platform' => 'Multiple',
                'release_year' => 2016,
                'image' => '/assets/images/video_games/overwatch.webp',
                'is_favorite' => false,
                'graphics' => 9.4,
                'gameplay' => 9.5,
                'story' => 8.5
            ],
            [
                'name' => 'The Elder Scrolls V: Skyrim',
                'developer' => 'Bethesda Game Studios',
                'description' => 'Un RPG de mundo abierto ambientado en el mundo de fantasía de Tamriel. Explora un vasto mundo lleno de dragones, mazmorras y aventuras épicas.',
                'genre' => 'RPG',
                'platform' => 'Multiple',
                'release_year' => 2011,
                'image' => '/assets/images/video_games/skyrim.webp',
                'is_favorite' => true,
                'graphics' => 9.3,
                'gameplay' => 9.7,
                'story' => 9.8
            ],
            [
                'name' => 'Persona 5',
                'developer' => 'Atlus',
                'description' => 'Un JRPG que sigue a un grupo de estudiantes de secundaria. Utiliza tu doble vida para salvar a los corazones corruptos de la sociedad.',
                'genre' => 'JRPG',
                'platform' => 'PlayStation 4',
                'release_year' => 2016,
                'image' => '/assets/images/video_games/persona_5.webp',
                'is_favorite' => true,
                'graphics' => 9.6,
                'gameplay' => 9.5,
                'story' => 9.9
            ],
            [
                'name' => 'Dark Souls III',
                'developer' => 'FromSoftware',
                'description' => 'Un RPG de acción conocido por su jugabilidad desafiante. Enfréntate a enemigos despiadados y descubre secretos oscuros en un mundo en ruinas.',
                'genre' => 'RPG de acción',
                'platform' => 'Multiple',
                'release_year' => 2016,
                'image' => '/assets/images/video_games/dark_souls_3.webp',
                'is_favorite' => false,
                'graphics' => 9.5,
                'gameplay' => 9.6,
                'story' => 9.0
            ],
            [
                'name' => 'The Last of Us Part II',
                'developer' => 'Naughty Dog',
                'description' => 'Un juego de acción y aventuras impulsado por una narrativa. Sigue la historia de Ellie en un mundo post-apocalíptico mientras busca venganza.',
                'genre' => 'Acción-aventura',
                'platform' => 'PlayStation 4',
                'release_year' => 2020,
                'image' => '/assets/images/video_games/last_of_us_part_2.webp',
                'is_favorite' => false,
                'graphics' => 9.9,
                'gameplay' => 9.7,
                'story' => 9.8
            ],
            [
                'name' => 'Final Fantasy VII Remake',
                'developer' => 'Square Enix',
                'description' => 'Una nueva versión del clásico JRPG Final Fantasy VII. Acompaña a Cloud y sus amigos en su lucha contra la corporación Shinra.',
                'genre' => 'JRPG',
                'platform' => 'PlayStation 4',
                'release_year' => 2020,
                'image' => '/assets/images/video_games/final_fantasy_7_remake.webp',
                'is_favorite' => true,
                'graphics' => 9.8,
                'gameplay' => 9.6,
                'story' => 9.9
            ],
            [
                'name' => 'Resident Evil 2',
                'developer' => 'Capcom',
                'description' => 'Una nueva versión del juego de terror y supervivencia Resident Evil 2. Sobrevive al brote zombie en Raccoon City como Leon y Claire.',
                'genre' => 'Terror de supervivencia',
                'platform' => 'Multiple',
                'release_year' => 2019,
                'image' => '/assets/images/video_games/resident_evil_2.webp',
                'is_favorite' => false,
                'graphics' => 9.7,
                'gameplay' => 9.5,
                'story' => 9.6
            ],
            [
                'name' => 'Super Mario Odyssey',
                'developer' => 'Nintendo',
                'description' => 'Un juego de plataformas que presenta a Mario en un mundo 3D. Viaja por diferentes reinos para rescatar a la Princesa Peach de Bowser.',
                'genre' => 'Plataformas',
                'platform' => 'Nintendo Switch',
                'release_year' => 2017,
                'image' => '/assets/images/video_games/super_mario_odyssey.webp',
                'is_favorite' => true,
                'graphics' => 9.8,
                'gameplay' => 9.9,
                'story' => 9.5
            ],
            [
                'name' => 'Metal Gear Solid V: The Phantom Pain',
                'developer' => 'Kojima Productions',
                'description' => 'Un juego de acción sigilosa en mundo abierto. Acompaña a Snake en su misión de venganza contra la organización que lo traicionó.',
                'genre' => 'Acción sigilosa',
                'platform' => 'Multiple',
                'release_year' => 2015,
                'image' => '/assets/images/video_games/metal_gear_solid_v.webp',
                'is_favorite' => true,
                'graphics' => 9.7,
                'gameplay' => 9.8,
                'story' => 9.6
            ],
        ];

        foreach ($realGames as $game) {
            VideoGame::create($game);
        }

        VideoGame::factory()->count(5)->create();
    }
}
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
                'description' => 'An action-adventure game set in an open world environment.',
                'genre' => 'Action-adventure',
                'platform' => 'Nintendo Switch',
                'release_year' => 2017,
                'image' => '/assets/images/video_games/zelda_breath_of_the_wild.jpg',
                'is_favorite' => false,
                'graphics' => 4.8,
                'gameplay' => 4.9,
                'story' => 4.7
            ],
            [
                'name' => 'God of War',
                'developer' => 'Santa Monica Studio',
                'description' => 'A third-person action-adventure game.',
                'genre' => 'Action-adventure',
                'platform' => 'PlayStation 4',
                'release_year' => 2018,
                'image' => '/assets/images/video_games/god_of_war.jpg',
                'is_favorite' => true,
                'graphics' => 4.9,
                'gameplay' => 4.8,
                'story' => 4.9
            ],
            [
                'name' => 'Red Dead Redemption 2',
                'developer' => 'Rockstar Games',
                'description' => 'An action-adventure game set in an open world.',
                'genre' => 'Action-adventure',
                'platform' => 'Multiple',
                'release_year' => 2018,
                'image' => '/assets/images/video_games/red_dead_redemption_2.webp',
                'is_favorite' => false,
                'graphics' => 4.7,
                'gameplay' => 4.6,
                'story' => 4.8
            ],
            [
                'name' => 'The Witcher 3: Wild Hunt',
                'developer' => 'CD Projekt Red',
                'description' => 'An open world RPG set in a medieval fantasy world.',
                'genre' => 'RPG',
                'platform' => 'Multiple',
                'release_year' => 2015,
                'image' => '/assets/images/video_games/the_witcher_3.webp',
                'is_favorite' => true,
                'graphics' => 4.9,
                'gameplay' => 4.8,
                'story' => 4.9
            ],
            [
                'name' => 'Horizon Zero Dawn',
                'developer' => 'Guerrilla Games',
                'description' => 'An action RPG set in a post-apocalyptic world.',
                'genre' => 'Action RPG',
                'platform' => 'PlayStation 4',
                'release_year' => 2017,
                'image' => '/assets/images/video_games/horizon_zero_dawn.webp',
                'is_favorite' => true,
                'graphics' => 4.7,
                'gameplay' => 4.6,
                'story' => 4.5
            ],
            [
                'name' => 'Spider-Man',
                'developer' => 'Insomniac Games',
                'description' => 'An action-adventure game featuring Marvel\'s Spider-Man.',
                'genre' => 'Action-adventure',
                'platform' => 'PlayStation 4',
                'release_year' => 2018,
                'image' => '/assets/images/video_games/spider_man.webp',
                'is_favorite' => false,
                'graphics' => 4.8,
                'gameplay' => 4.7,
                'story' => 4.6
            ],
            [
                'name' => 'Cyberpunk 2077',
                'developer' => 'CD Projekt Red',
                'description' => 'An open-world, action-adventure story set in Night City.',
                'genre' => 'RPG',
                'platform' => 'Multiple',
                'release_year' => 2020,
                'image' => '/assets/images/video_games/cyberpunk_2077.webp',
                'is_favorite' => false,
                'graphics' => 4.5,
                'gameplay' => 4.0,
                'story' => 4.2
            ],
            [
                'name' => 'GTA V',
                'developer' => 'Rockstar North',
                'description' => 'An action-adventure game set in an open world.',
                'genre' => 'Action-adventure',
                'platform' => 'Multiple',
                'release_year' => 2013,
                'image' => '/assets/images/video_games/gta_v.webp',
                'is_favorite' => true,
                'graphics' => 4.7,
                'gameplay' => 4.8,
                'story' => 4.6
            ],
            [
                'name' => 'Assassin\'s Creed Odyssey',
                'developer' => 'Ubisoft',
                'description' => 'An open world action RPG set in Ancient Greece.',
                'genre' => 'Action RPG',
                'platform' => 'Multiple',
                'release_year' => 2018,
                'image' => '/assets/images/video_games/assassins_creed_odyssey.webp',
                'is_favorite' => false,
                'graphics' => 4.6,
                'gameplay' => 4.5,
                'story' => 4.4
            ],
            [
                'name' => 'Fortnite',
                'developer' => 'Epic Games',
                'description' => 'A battle royale game with building mechanics.',
                'genre' => 'Battle Royale',
                'platform' => 'Multiple',
                'release_year' => 2017,
                'image' => '/assets/images/video_games/fortnite.webp',
                'is_favorite' => false,
                'graphics' => 4.2,
                'gameplay' => 4.3,
                'story' => 3.9
            ],
            [
                'name' => 'Minecraft',
                'developer' => 'Mojang',
                'description' => 'A sandbox game with building, survival, and adventure elements.',
                'genre' => 'Sandbox',
                'platform' => 'Multiple',
                'release_year' => 2011,
                'image' => '/assets/images/video_games/minecraft.webp',
                'is_favorite' => true,
                'graphics' => 3.8,
                'gameplay' => 4.8,
                'story' => 4.0
            ],
            [
                'name' => 'Overwatch',
                'developer' => 'Blizzard Entertainment',
                'description' => 'A team-based multiplayer first-person shooter.',
                'genre' => 'First-person shooter',
                'platform' => 'Multiple',
                'release_year' => 2016,
                'image' => '/assets/images/video_games/overwatch.webp',
                'is_favorite' => false,
                'graphics' => 4.4,
                'gameplay' => 4.5,
                'story' => 3.5
            ],
            [
                'name' => 'The Elder Scrolls V: Skyrim',
                'developer' => 'Bethesda Game Studios',
                'description' => 'An open world RPG set in the fantasy world of Tamriel.',
                'genre' => 'RPG',
                'platform' => 'Multiple',
                'release_year' => 2011,
                'image' => '/assets/images/video_games/skyrim.webp',
                'is_favorite' => true,
                'graphics' => 4.3,
                'gameplay' => 4.7,
                'story' => 4.8
            ],
            [
                'name' => 'Persona 5',
                'developer' => 'Atlus',
                'description' => 'A JRPG that follows a group of high school students.',
                'genre' => 'JRPG',
                'platform' => 'PlayStation 4',
                'release_year' => 2016,
                'image' => '/assets/images/video_games/persona_5.webp',
                'is_favorite' => true,
                'graphics' => 4.6,
                'gameplay' => 4.5,
                'story' => 4.9
            ],
            [
                'name' => 'Dark Souls III',
                'developer' => 'FromSoftware',
                'description' => 'An action RPG known for its challenging gameplay.',
                'genre' => 'Action RPG',
                'platform' => 'Multiple',
                'release_year' => 2016,
                'image' => '/assets/images/video_games/dark_souls_3.webp',
                'is_favorite' => false,
                'graphics' => 4.5,
                'gameplay' => 4.6,
                'story' => 4.0
            ],
            [
                'name' => 'The Last of Us Part II',
                'developer' => 'Naughty Dog',
                'description' => 'A narrative-driven action-adventure game.',
                'genre' => 'Action-adventure',
                'platform' => 'PlayStation 4',
                'release_year' => 2020,
                'image' => '/assets/images/video_games/last_of_us_part_2.webp',
                'is_favorite' => false,
                'graphics' => 4.9,
                'gameplay' => 4.7,
                'story' => 4.8
            ],
            [
                'name' => 'Final Fantasy VII Remake',
                'developer' => 'Square Enix',
                'description' => 'A remake of the classic JRPG Final Fantasy VII.',
                'genre' => 'JRPG',
                'platform' => 'PlayStation 4',
                'release_year' => 2020,
                'image' => '/assets/images/video_games/final_fantasy_7_remake.webp',
                'is_favorite' => true,
                'graphics' => 4.8,
                'gameplay' => 4.6,
                'story' => 4.9
            ],
            [
                'name' => 'Resident Evil 2',
                'developer' => 'Capcom',
                'description' => 'A remake of the survival horror game Resident Evil 2.',
                'genre' => 'Survival horror',
                'platform' => 'Multiple',
                'release_year' => 2019,
                'image' => '/assets/images/video_games/resident_evil_2.webp',
                'is_favorite' => false,
                'graphics' => 4.7,
                'gameplay' => 4.5,
                'story' => 4.6
            ],
            [
                'name' => 'Super Mario Odyssey',
                'developer' => 'Nintendo',
                'description' => 'A platform game featuring Mario in a 3D world.',
                'genre' => 'Platform',
                'platform' => 'Nintendo Switch',
                'release_year' => 2017,
                'image' => '/assets/images/video_games/super_mario_odyssey.webp',
                'is_favorite' => true,
                'graphics' => 4.8,
                'gameplay' => 4.9,
                'story' => 4.5
            ],
            [
                'name' => 'Metal Gear Solid V: The Phantom Pain',
                'developer' => 'Kojima Productions',
                'description' => 'An open world stealth action game.',
                'genre' => 'Stealth action',
                'platform' => 'Multiple',
                'release_year' => 2015,
                'image' => '/assets/images/video_games/metal_gear_solid_v.webp',
                'is_favorite' => true,
                'graphics' => 4.7,
                'gameplay' => 4.8,
                'story' => 4.6
            ],
        ];

        foreach ($realGames as $game) {
            VideoGame::create($game);
        }

        // Generar videojuegos ficticios
        VideoGame::factory()->count(5)->create();
    }
}

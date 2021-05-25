<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use App\Entity\Thematic;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ThematicFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(){

        return[
            UserFixtures::class
        ];
    }
    public function load(ObjectManager $manager)
    {

        $thematics=[
            [
           "image" => "escapade-romantique--74-fo-big.jpg",
           "name" => "Weekend en amoureux" ,
           "description" => "Offrez à votre couple une escapade romantique Vous avez envie de vous isoler à deux, de profiter d’un weekend"
            ],
            [
             "image" => "sejour-en-famille--311-fo-normal.jpg",
             "name" => "Weekend en famille" ,
             "description" => "Réservez vos vacances en famille !
             C’est bientôt les vacances scolaires et vous avez envie de vous retrouver..."
            ],
            [
             "image" => "isolement-depaysement-tranquillite--65-fo-normal.jpg",
             "name" => "Dépaysement & Tranquillité" ,
             "description" => "Une envie d'évasion, de nouveauté, d’isolement mais sans partir à l'autre bout du monde ? Filez vite dans l’un..."
            ],
            [
             "image" => "amateur-vin--302-fo-normal.jpg",
             "name" => "Amateurs de vins" ,
             "description" => "Vous aimez vous détendre autour d'un bon verre ? Et si vous vous laissiez tenter par un week-end dans un de ce..."
            ],
            [
             "image" => "experts-culinaires--71-fo-normal.jpg",
             "name" => "Cuisine locale et du terroir" ,
             "description" => "Le temps d'une nuit, d'un week-end ou plus si affinité, tous les hébergements insolites que vous trouverez"
            ],
            [
             "image" => "vacances-spa-et-bien-etre--174-fo-normal.jpg",
             "name" => "Spa & Bien-être" ,
             "description" => "Réservez un séjour détente en amoureux, dans un hébergement avec spa ! 
             Vous êtes épuisé par votre rythm"
            ],
            [
             "image" => "sejour-a-la-campagne--54-fo-normal.jpg",
             "name" => "Campagne" ,
             "description" => "Marre des transports en commun, des bousculades, des pauses déjeuners chronométrées ? Ne paniquez pas"
            ],
            [
             "image" => "sejour-amis-des-animaux--58-fo-normal.jpg",
             "name" => "Amis des animaux" ,
             "description" => " Vos animaux de compagnie ont aussi droit à l’insolite !Vous avez envie de voyager"
            ],
            [
             "image" => "site-historique--57-fo-normal.jpg",
             "name" => "Site historique" ,
             "description" => "Offrez-vous un week-end original dans lequel vous combinerez activités culturelles et logements atypiques."
            ],
            [
             "image" => "sejour-amis-de-la-nature--66-fo-big.jpg",
             "name" => "Amis de la nature" ,
             "description" => "Certains pensent que la nature hait la normalité… Amis de la nature, si vous partagez aussi cet avis"
            ],
            [
             "image" => "vacances-randonnees--60-fo-normal.jpg",
             "name" => "Grands marcheurs" ,
             "description" => "Sept kilomètres à pied, ça use, ça use...sept kilomètres à pied, ça use les souliers !"
            ],
            [
             "image" => "vacances-thalasso--68-fo-normal.jpg",
             "name" => "Vacances thalasso" ,
             "description" => "Le sport n'est vraiment pas votre tasse de thé et vous souhaitez vous refaire une santé d’urgence ?"
            ],
            [
             "image" => "sejour-lieu-dexception--70-fo-normal.jpg",
             "name" => "Lieu extraordinaire" ,
             "description" => "Avec Abracadaroom, un séjour dans un lieu extraordinaire n'est pas synonyme de prix élevé ni de dorures."
            ],
            [
             "image" => "vacances-culturelles--69-fo-normal.jpg",
             "name" => "Vacances culturelles" ,
             "description" => "Optez pour une escapade culturelle de quelques jours à la rencontre de nos plus belles régions françaises"
            ],
            [
             "image" => "vacances-de-golfeur--72-fo-big.jpg",
             "name" => "Grands golfeurs" ,
             "description" => "Donnez nous des clubs de golf, de l'air frais et un green de qualité"
            ],
            [
             "image" => "vacances-sportives--55-fo-normal.jpg",
             "name" => "Vacances sportives" ,
             "description" => "Vous en avez ras-le-bol du calme plat du quotidien et vous voulez de l’action ?"
            ],
            [
             "image" => "sejour-bord-de-mer--59-fo-normal.jpg",
             "name" => "Bord de Mer" ,
             "description" => "Besoin d’un break au bord de la mer ?Boulot stressant ? Quotidien surbooké ?"
            ],
            [
             "image" => "sejour-aventures--73-fo-big.jpg",
             "name" => "Âme d'Aventurier" ,
             "description" => "Passionnés d'aventures et de sensations fortes dans un cadre hors du commun ? Vous frappez à la bonne porte
             "
            ]
            ];

        $faker = Faker\Factory::create('fr_FR');
        for($i = 0; $i < count($thematics); $i++){
            $thematic = new Thematic();
            
            $thematic->setName($thematics[$i]['name']);
            $thematic->setDescription($thematics[$i]['description']);
            $thematic->setFileName($thematics[$i]['image']);
            $thematic->setAuthor($this->getReference('USER'.mt_rand(1,10)));
            $thematic->setCreatedAt($faker->dateTime('now'));
            $manager->persist($thematic);
            $this->addReference('THEMATIC'.$i, $thematic);
        }
        $manager->flush();
    }
}
<?php

namespace App\DataFixtures;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use App\Entity\Category;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class CategoryFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(){

        return[
            UserFixtures::class
        ];
    }
    public function load(ObjectManager $manager)
    {
        $categories=[
            [
           "image" => "cabane-dans-les-arbres--73-fo-normal.jpg",
           "name" => "Cabane dans les arbres" ,
           "description" => "Prenez de la distance sur votre quotidien, mais surtout de la hauteur ! En couple, en famille ou entre amis, tous les prétextes sont bons à des retrouvailles perchées."
            ],
            [
             "image" => "cabane-sur-pilotis--64-fo-normal.jpg",
             "name" => "Cabane sur pilotis" ,
             "description" => "Réalisez votre rêve d'enfant et surplombez la nature de votre cabane sur pilotis. Au plus près des étoiles et de la cime des arbres le temps va s'arrêter."
            ],
            [
             "image" => "cabane--27-fo-normal.jpg",
             "name" => "Cabane" ,
             "description" => "À jamais associée à l'enfance, il est désormais possible de réaliser ce rêve. À vous de choisir le niveau de confort : minimal pour un esprit authentique et sauvage ou haut de gamme pour vivre l'aventure sans concession."
            ],
            [
             "image" => "roulotte--70-fo-normal.jpg",
             "name" => "Roulotte" ,
             "description" => "Moyen de locomotion autant que de vie pour les gens du voyage, la roulotte est un hébergement convivial et chaleureux. Tzigane, Irlandaise ou même Gitane... à vous de choisir le style."
            ],
            [
             "image" => "tente-et-tente-lodge--67-fo-normal.jpg",
             "name" => "Tente et tente lodge" ,
             "description" => "La tente n'est pas que synonyme d'incommodité. Elle se veut également luxe et confort, c'est aussi ça l'insolite !"
            ],
            [
             "image" => "bulles--26-fo-normal.jpg",
             "name" => "Bulle" ,
             "description" => "Passer une nuit dans une bulle c'est la promesse d'un voyage hors du temps. Toute en transparence, plus aucune barrière entre vous et le rêve. Une nuit à la belle étoile n'a jamais aussi bien porté son nom."
            ],
            [
             "image" => "yourte--75-fo-normal.jpg",
             "name" => "Yourte" ,
             "description" => "La yourte est sans doute l'hébergement qui vous fera voyager. Envie d'authenticité ? Faîtes un bond en Asie et vivez à la façon des Mongols, tous les codes sont respectés pour vous y croire. Adepte de modernité ? Les versions revisitées vous plairont !"
            ],
            [
             "image" => "cabane-sur-leau--41-fo-normal.jpg",
             "name" => "Cabane sur l'eau" ,
             "description" => "Les cabanes sur l'eau vous offrent un point de vue incomparable. Un besoin de retour aux sources, une envie de liberté ? Testez sans plus tarder ce type d'hébergement insolite."
            ],
            [
             "image" => "lodge-safari--60-fo-normal.jpg",
             "name" => "Lodge safari" ,
             "description" => "La Lodge Safari est un hébergement spacieux parfait pour un petit séjour insolite en famille. Fait de bois, elle est principalement utilisée dans l'Afrique de l'Est et du Sud lors des safaris !"
            ],
            [
             "image" => "dome--36-fo-normal.jpg",
             "name" => "Dôme" ,
             "description" => "Le Dôme derrière son aspect simple est un concept ingénieux. Résistance aux intempéries, facile à chauffer : tout est imaginé pour votre bien-être."
            ],
            [
             "image" => "inclassable--57-fo-normal.jpg",
             "name" => "Inclassable" ,
             "description" => "Ils sont tellement insolites qu'ils sont uniques !"
            ],
            [
             "image" => "tonneau--23-fo-normal.jpg",
             "name" => "Tonneau" ,
             "description" => "On a souvent du mal à l’imaginer et pourtant, dormir dans un tonneau n’est pas impossible. Avec tout le confort nécessaire, il s’avère être le moyen idéal pour un dépaysement total . Les grands fûts n’attendent plus que vous !"
            ],
            [
             "image" => "chalet--32-fo-normal.jpg",
             "name" => "Chalet" ,
             "description" => "Les chalets se trouvent dans les régions montagneuses, l'omniprésence du bois leur confère une ambiance chaleureuse et cocooning. Du plus rustique au plus moderne il y'en a pour tous les goûts."
            ],
            [
             "image" => "kota--48-fo-normal.jpg",
             "name" => "Kota" ,
             "description" => "Le mot Kota se traduit par \"abri de chasse\" en lapon. Habitation traditionnelle originaire de Finlande il est fait tout de bois comme son cousin le chalet, on le reconnaît par sa forme hexagonale unique."
            ],
            [
             "image" => "tipi--68-fo-normal.jpg",
             "name" => "Tipi" ,
             "description" => "Originaire des tribus amérindiennes,\"Tipi\" signifie habitation. Cette conception ingénieuse, permettait de se protéger des aléas climatiques. Mettez vous dans la peau de ces tribus en vous coupant, le temps d'un séjour, du superflu du quotidien."
            ],
            [
             "image" => "tipi--68-fo-normal.jpg",
             "name" => "Bateau" ,
             "description" => "Dormir sur un bateau, quoi de plus insolite ? Ajoutez une dimension exceptionnelle à votre expérience. Calme et évasion sont les maîtres mots, bercé par les flots votre nuit n'en sera que plus douce."
            ],
            [
             "image" => "nid--55-fo-normal.jpg",
             "name" => "Nid" ,
             "description" => "Vivez comme un oiseau, dans un nid, perché dans les arbres ! Vous vivrez une expérience insolite en toute sécurité grâce au filet qui se trouve tout autour du nid... Vous allez adorer passer une nuit dans les arbres !"
            ],
            [
             "image" => "chariot-de-pionnier--74-fo-normal.jpg",
             "name" => "Chariot de pionnier" ,
             "description" => "Vivez comme un cow-boy ! Synonyme de liberté, le chariot de pionnier vous permet de goûter d’une façon originale aux plaisirs des vacances nomades tout en bénéficiant d’un hébergement confortablement équipé.
             "
            ],
            [
             "image" => "caravane--78-fo-normal.jpg",
             "name" => "Caravane & Airstream" ,
             "description" => "Plongez dans vos souvenirs... Ambiance et esprit vintage garantie à bord de ces caravanes américaines, installées au cœur de la nature. Les amoureux de véhicules anciens seront ravis !"
            ]
            ];
        $faker = Faker\Factory::create('fr_FR');

        for($i = 0; $i <count($categories); $i++){

            $category = new Category();
            $category->setName($categories[$i]['name']);
            $category->setDescription($categories[$i]['description']);
            $category->setFileName($categories[$i]['image']);
            $category->setCreatedAt($faker->DateTime('now'));
            $category->setAuthor($this->getReference('USER'.mt_rand(1,10)));
            $manager->persist($category);
            $this->addReference('CAT'.$i, $category);
        }  
        $manager->flush();
    }
}
<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use App\Entity\Destination;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class DestinationFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(){

        return[

            UserFixtures::class

        ];
    }
    public function load(ObjectManager $manager)
    {
        $imageDestinations = ["un.jpg", "deux.jpg", "trois.jpg", "quatre.jpg", "cinq.jpg", "six.jpg", "sept.jpg","huit.jpg", "neuf.jpg", "dix.jpg", "onze.jpg"];
        $Destinations = ["Bretagne", "Normandie", "Chavagne", "Aix-les-bains", "Bourgogne", "Brest", "Vache-comte","corse", "Grenoble", "Côte-Armor", "Finistères"];
        $faker = Faker\Factory::create('fr_FR');
        for($i = 0; $i <= 10; $i++){
            $destination = new Destination();
            $destination->setAddress( $Destinations[$i]);
            $destination->setDescription($faker->title);
            $destination->setFileName( $imageDestinations[$i]);
            $destination->setAuthor($this->getReference('USER'.mt_rand(1,10)));
            $destination->setCreatedAt($faker->dateTime('now')); 
            $manager->persist($destination);
            $this->addReference('DESTINATION'.$i, $destination);
        }
        $manager->flush();
    }
}
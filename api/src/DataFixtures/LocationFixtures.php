<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker;
use App\Entity\Location;

class LocationFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(){

        return[
            CategoryFixtures::class,
            DestinationFixtures::class,
            ThematicFixtures::class,
            UserFixtures::class
        ];
    }
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');
        for($i = 0; $i <= 10; $i++){
           
            
            $location = new Location($faker->numberBetween(1,10));
            $location->setName($faker->title);
            $location->setDescription($faker->word(30));
            $location->setStreet($faker->streetName);
            $location->setPostalCode($faker->postcode);
            $location->setCity($faker->city);
            $location->setPrice($faker->numberBetween(30,50));
            $location->setRooms($faker->numberBetween(1,5));
            $location->setSurface($faker->numberBetween(15,80));
            $location->setCategory($this->getReference('CAT'.mt_rand(1,18)));
            $location->addThematic($this->getReference('THEMATIC'.mt_rand(1,17)));
            $location->setDestination($this->getReference('DESTINATION'.mt_rand(1,10)));
            $location->setUser($this->getReference('USER'.mt_rand(1,10)));
            $location->setCreatedAt($faker->dateTime('now')); 
            $manager->persist($location);
            $this->addReference('LOC'.$i, $location);
        }

        $manager->flush();
    }
}
<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker;
use App\Entity\Image;

class ImageFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(){

        return[
            LocationFixtures::class
        ];
    }
    public function load(ObjectManager $manager)
    {
       $faker = Faker\Factory::create('fr_FR');
       $fileName = ["un.jpg", "deux.jpg", "trois.jpg"];
        for($i = 0; $i <= 40; $i++){
            $image = new Image();
            $countFileName=$i%3;
            $image->setDescription($faker->title);
            $image->setFileName($fileName[$countFileName]);
            $image->setCreatedAt($faker->dateTime('now'));
            $manager->persist($image);
            $counLoc= $i%11;
            $image->setLocation($this->getReference('LOC'.$counLoc));
           
        }
        $manager->flush();
        
    }
}
<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\Entity\User;

class UserFixtures extends Fixture
{
    private $encoderPass;

    public function __construct(UserPasswordEncoderInterface $encoder){
        $this->encoderPass = $encoder;
    }
    public function load(ObjectManager $manager){

        $faker = Faker\Factory::create('fr_FR');
        for($i = 0; $i<=10; $i++){

            $user = new User();
            $user->setEmail($faker->email);
            $user->setPassword($this->encoderPass->encodePassword($user, "azertyuiop"));
            $user->setRoles(['ROLE_ADMIN']);
            $user->setName($faker->firstName);
            $user->setLastName($faker->lastName);
            $user->setPhone($faker->phoneNumber);
            $user->setRue($faker->streetName);
            $user->setCity($faker->city);
            $user->setStatus(true);
            $user->setDateOfBirth($faker->dateTime());
            $user->setZipCode($faker->postcode);
            $user->setDateCreated($faker->dateTime());
            $user->setAcceptReceiveNewsLetters(true);
            $user->setAcceptConditionsUser(true);
            $user->setReference("REP".uniqid());
            $manager->persist($user);
            $this->addReference('USER'.$i, $user);
        }
        $manager->flush();
    }
}
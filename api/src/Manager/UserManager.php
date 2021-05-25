<?php

namespace App\Manager;

use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use ApiPlatform\Core\Validator\ValidatorInterface;

class UserManager
{
    protected $em;
    protected $passwordEncoder;
    protected $userRepository;
    private $validator;
 
    public function  __construct(
        EntityManagerInterface $em,
        UserPasswordEncoderInterface $passwordEncoder,
        UserRepository $userRepository,
        ValidatorInterface $validator

    )
    {
        $this->em = $em;
        $this->validator = $validator;
        $this->passwordEncoder = $passwordEncoder;
        $this->userRepository = $userRepository;

    }

    public function findEmail(string $email)
    {
        $user = $this->userRepository->findByEmail($email);
        if($user){
            return $user[0];
        }
        return null;
    }
    public function referenceFormat()
    {
      return "REP".uniqid();
    }
    public function registerUser(User $user)
    {
        if($this->findEmail($user->getEmail())){
            throw new BadRequestHttpException("Votre adresse e-mail est déjà utilisée");
           
        }
        $passWord = $this->passwordEncoder->encodePassword($user, $user->getPassword());
        $user->setPassword($passWord);
        $user->setReference($this->referenceFormat());

        $this->validator->validate($user);
        $this->em->persist($user);
        $this->em->flush();

        return [
            "message" => "Bonjour ".$user->getName().", Bienvenue sur Atypikhouse",
            "user" => $user
        ];
        
    }

}

?>
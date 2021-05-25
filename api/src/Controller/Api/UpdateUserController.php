<?php

namespace App\Controller\Api;

use App\Entity\Location;
use App\Entity\ImageActivity;
use App\Entity\User;
use App\Entity\Activity;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Core\Validator\ValidatorInterface;
use ApiPlatform\Core\Validator\Exception\ValidationException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


final class UpdateUserController extends AbstractController
{
   
    /**
     * @var ValidatorInterface
     */
    private $validator;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    protected $passwordEncoder;



    public function __construct(
        ValidatorInterface $validator,
        EntityManagerInterface $entityManager,
        UserPasswordEncoderInterface $passwordEncoder
    )
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
        $this->passwordEncoder = $passwordEncoder;
       
    }

    public function __invoke(User $user):User
    {

       if(strlen($user->getPassword())<15){
        $passWord = $this->passwordEncoder->encodePassword($user, $user->getPassword());
        $user->setPassword($passWord);
       }

        $this->entityManager->persist($user);
        $this->entityManager->flush();
       
        return $user;


    }
}

http://jameshuynh.com/rails/react/upload/2017/09/17/how-to-upload-files-using-react-and-rails-like-a-boss/
<?php

namespace App\Controller\Api;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Manager\UserManager;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RegisterUserController 
{
    protected $userManager;

    public function __construct(UserManager $userManager)
    {
        $this->userManager = $userManager;
    }

    public function __invoke(User $data)
    {
        
        
        return $this->userManager->registerUser($data);
       
       
    }
}

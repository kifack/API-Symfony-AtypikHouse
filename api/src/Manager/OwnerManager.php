<?php

namespace App\Manager;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\Outsider;
use App\Repository\UserRepository;
use App\Repository\OutsiderRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Security;

class OwnerManager
{
    protected $em;
    protected $userRepository;
    protected $outsiderRepository;
    private $security;

    public function __construct(
        EntityManagerInterface $em,
        UserRepository $userRepository,
        OutsiderRepository $outsiderRepository,
        Security $security
    )
    {
        $this->em = $em;
        $this->userRepository = $userRepository;
        $this->outsiderRepository = $outsiderRepository;
        $this->security=$security;
    }

    public function becomeOwner(Outsider $outsider){
   
        $user = $this->security->getUser();
        $outsider->setLegalRepresent($user);
        
        $user->setRoles(["ROLE_OWNER"]);
        $this->em->persist($user);
        $this->em->persist($outsider);
        $this->em->flush();
        return [
            "message" => " ".$user->getName().", Votre entreprise a été rajouté avec succes",
        ];
    }
}
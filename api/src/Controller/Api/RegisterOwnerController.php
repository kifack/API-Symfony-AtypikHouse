<?php
namespace App\Controller\Api;
use App\Entity\Outsider;
use App\Manager\OwnerManager;
use Doctrine\ORM\EntityManagerInterface;

class RegisterOwnerController{
    protected $ownerManager;

    public function __construct(OwnerManager $ownerManager){
        $this->ownerManager = $ownerManager;
    }
    public function __invoke(Outsider $data){
        return $this->ownerManager->becomeOwner($data); 
    }
}
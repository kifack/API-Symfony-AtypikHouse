<?php

namespace App\Controller\Api;

use App\Entity\Destination;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Validator\ValidatorInterface;

final class AddDestinationController
{
   
    private $security;
    private $validator;

    public function __construct(ValidatorInterface $validator, Security $security)
    {

        $this->security=$security;
        $this->validator = $validator;
    }

    public function __invoke(Request $request): Destination
    {
        $uploadedFile = $request->files->get('file');
        // if (!$uploadedFile) {
        //     throw new BadRequestHttpException('"file" is required'); 
        // }

        $destination = new Destination();
        $destination->setDescription($request->request->get('description') ?: "");
        $destination->setAddress($request->request->get('address') ?: "");
        $destination->setImageFile($uploadedFile);
        $destination->setAuthor($this->security->getUser());
           
        $this->validator->validate($destination);
        return $destination;
    }
}
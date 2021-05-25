<?php

namespace App\Controller\Api;

use App\Entity\Thematic;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Validator\ValidatorInterface;

final class AddThematicController
{
   
    private $security;
    private $validator;

    public function __construct(ValidatorInterface $validator, Security $security)
    {

        $this->security=$security;
        $this->validator = $validator;
    }

    public function __invoke(Request $request): Thematic
    {
        $uploadedFile = $request->files->get('file');
        
        $thematic = new Thematic();
        $thematic->setDescription($request->request->get('description') ?: "");
        $thematic->setName($request->request->get('name') ?: "");
        $thematic->setImageFile($uploadedFile);
        $thematic->setAuthor($this->security->getUser());

        $this->validator->validate($thematic);

        return $thematic;
    }
}
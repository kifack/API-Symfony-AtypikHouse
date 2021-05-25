<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OutsiderRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(collectionOperations={
 * "post"={},
 * "registerOwner"={
 * "method"="POST",
 * "path"="/owner/register",
 * "controller"=App\Controller\Api\RegisterOwnerController::class,
 * "denormalization_context"={"groups"={"outsider:write"}},
 * },
 * "get"={}
 * },
 * itemOperations={"get","put","delete"},
 * normalizationContext={"groups"={"outsider:read"}},
 * 
 * )
 * @ORM\Entity(repositoryClass=OutsiderRepository::class)
 */
class Outsider
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"outsider:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"outsider:read", "outsider:write","read:user-profile"})
     * @Assert\NotBlank(message="Veuillez renseigner la dénomination de votre entreprise")
     */
    private $denomination;

    /**
     * @ORM\Column(type="string", length=60)
     * @Groups({"outsider:read", "outsider:write","read:user-profile"})
     * @Assert\NotBlank(message="Veuillez renseigner le numéro de siret")
     */
    private $numberSiret;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"outsider:read", "outsider:write","read:user-profile"})
     * @Assert\NotBlank(message="Veuillez renseigner la la rue ou vous vivez")
     */
    private $street;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"outsider:read", "outsider:write","read:user-profile"})
     * @Assert\NotBlank(message="Veuillez renseigner votre adresse complémentaire")
     */
    private $otherInformationAddresse;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"outsider:read", "outsider:write","read:user-profile"})
     * @Assert\NotBlank(message="Veuillez renseigner la ville")
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"outsider:read", "outsider:write","read:user-profile"})
     * @Assert\NotBlank(message="Veuillez renseigner le code")
     */
    private $codeNaf;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"outsider:read", "outsider:write","read:user-profile"})
     * @Assert\NotBlank(message="Veuillez renseigner votre pays de résidence")
     */
    private $cuntry;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"outsider:read", "outsider:write","read:user-profile"})
     */
    private $dateCreated;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"outsider:read", "outsider:write"})
     */
    private $dateModified;

    /**
     * @ORM\Column(type="string", length=90)
     * @Groups({"outsider:read", "outsider:write"})
     * @Assert\NotBlank(message="Veuillez renseigner le code postal")
     */
    private $zipCode;

    /**
     * @ORM\Column(type="string", length=180)
     * @Groups({"outsider:read", "outsider:write","read:user-profile"})
     * @Assert\NotBlank(message="Veuillez renseigner la forme légale")
     */
    private $formLegal;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="outsider", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     * 
     */
    private $legalRepresent;

    
   
    

    public function __construct(){
        $this->dateCreated = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDenomination(): ?string
    {
        return $this->denomination;
    }

    public function setDenomination(string $denomination): self
    {
        $this->denomination = $denomination;

        return $this;
    }

    public function getNumberSiret(): ?string
    {
        return $this->numberSiret;
    }

    public function setNumberSiret(string $numberSiret): self
    {
        $this->numberSiret = $numberSiret;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(string $street): self
    {
        $this->street = $street;

        return $this;
    }

    public function getOtherInformationAddresse(): ?string
    {
        return $this->otherInformationAddresse;
    }

    public function setOtherInformationAddresse(string $otherInformationAddresse): self
    {
        $this->otherInformationAddresse = $otherInformationAddresse;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCodeNaf(): ?string
    {
        return $this->codeNaf;
    }

    public function setCodeNaf(string $codeNaf): self
    {
        $this->codeNaf = $codeNaf;

        return $this;
    }

    public function getCuntry(): ?string
    {
        return $this->cuntry;
    }

    public function setCuntry(string $cuntry): self
    {
        $this->cuntry = $cuntry;

        return $this;
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->dateCreated;
    }

    public function setDateCreated(\DateTimeInterface $dateCreated): self
    {
        $this->dateCreated = $dateCreated;

        return $this;
    }

    public function getDateModified(): ?\DateTimeInterface
    {
        return $this->dateModified;
    }

    public function setDateModified(?\DateTimeInterface $dateModified): self
    {
        $this->dateModified = $dateModified;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): self
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    

    public function getFormLegal(): ?string
    {
        return $this->formLegal;
    }

    public function setFormLegal(string $formLegal): self
    {
        $this->formLegal = $formLegal;

        return $this;
    }

    public function getLegalRepresent(): ?User
    {
        return $this->legalRepresent;
    }

    public function setLegalRepresent(User $legalRepresent): self
    {
        $this->legalRepresent = $legalRepresent;

        return $this;
    }

    

   

   
}

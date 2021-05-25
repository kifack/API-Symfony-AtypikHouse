<?php

namespace App\Entity;

use App\Repository\FieldValueRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=FieldRepository::class)
 * @ApiResource(
 * collectionOperations={"get","post"},
 * itemOperations={"get"}
 * )
 * @ORM\Entity(repositoryClass=FieldValueRepository::class)
 */
class FieldValue
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:location"})
     *  @Assert\NotBlank(message="Veuillez renseigner la valeur du parametre")
     */
    private $fieldValue;

    /**
     * @ORM\ManyToOne(targetEntity=Field::class, inversedBy="fieldValues")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:location"})
     * @Assert\NotNull(message="Veuillez renseignez le paramètre correspondant")
     */
    private $field;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="fieldValues")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotNull(message="Veuillez renseignez la location correspondant")
     */
    private $location;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFieldValue(): ?string
    {
        return $this->fieldValue;
    }

    public function setFieldValue(string $fieldValue): self
    {
        $this->fieldValue = $fieldValue;

        return $this;
    }

    public function getField(): ?Field
    {
        return $this->field;
    }

    public function setField(?Field $field): self
    {
        $this->field = $field;

        return $this;
    }

    public function getLocation(): ?Location
    {
        return $this->location;
    }

    public function setLocation(?Location $location): self
    {
        $this->location = $location;

        return $this;
    }
}

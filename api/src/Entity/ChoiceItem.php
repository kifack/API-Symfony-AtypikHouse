<?php

namespace App\Entity;

use App\Repository\ChoiceItemRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 * collectionOperations={"get","post"},
 * itemOperations={"get"}
 * )
 * @ORM\Entity(repositoryClass=ChoiceItemRepository::class)
 */
class ChoiceItem
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"read:all_fields"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"create:field","read:all_fields"})
     * @Assert\NotBlank(message="Veuillez renseigner le texte a afficher de l'option")
     */
    private $label;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"create:field","read:all_fields"})
     * @Assert\NotBlank(message="Veuillez renseigner la valeur de l'option")
     */
    private $valueItem;

    /**
     * @ORM\ManyToOne(targetEntity=Field::class, inversedBy="choices")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotNull(message="Veuillez renseignez le champ auquel il appartient")
     */
    private $field;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getValueItem(): ?string
    {
        return $this->valueItem;
    }

    public function setValueItem(string $valueItem): self
    {
        $this->valueItem = $valueItem;

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
}

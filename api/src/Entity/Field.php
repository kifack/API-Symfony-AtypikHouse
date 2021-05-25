<?php

namespace App\Entity;

use App\Repository\FieldRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=FieldRepository::class)
 * @ApiResource(
 * collectionOperations={ 
 * "get"={
 *          "path":"/All/fields",
 *          "normalization_context"={"groups"={"read:all_fields"}}
 *  },"post" = {
 *   "denormalization_context"={"groups"={"create:field"} }
 * }},
 * itemOperations={"get"}
 * )
 *  @ApiFilter(SearchFilter::class, properties={"category": "exact"})
 */
class Field
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
     * @Groups({"create:field","read:all_fields","read:location"})
     * @Assert\NotBlank(message="Veuillez renseigner le nom du parametre")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"create:field","read:all_fields"})
     * @Assert\NotBlank(message="Veuillez renseigner le texte à afficher du parametre")
     * 
     */
    private $label;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"create:field","read:all_fields"})
     * @Assert\NotBlank(message="Veuillez renseigner le type du parametre")
     */
    private $typeName;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="fields")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"create:field","read:all_fields"})
     * @Assert\NotBlank(message="Veuillez renseigner la categorie du parametre")
     */
    private $category;

    /**
     * @ORM\OneToMany(targetEntity=ChoiceItem::class, mappedBy="field", orphanRemoval=true,cascade={"persist"})
     * @Groups({"create:field","read:all_fields"})
     */
    private $choices;

    /**
     * @ORM\OneToMany(targetEntity=FieldValue::class, mappedBy="field", orphanRemoval=true)
     */
    private $fieldValues;

    public function __construct()
    {
        $this->choices = new ArrayCollection();
        $this->fieldValues = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
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

    public function getTypeName(): ?string
    {
        return $this->typeName;
    }

    public function setTypeName(string $typeName): self
    {
        $this->typeName = $typeName;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection|ChoiceItem[]
     */
    public function getChoices(): Collection
    {
        return $this->choices;
    }

    public function addChoice(ChoiceItem $choice): self
    {
        if (!$this->choices->contains($choice)) {
            $this->choices[] = $choice;
            $choice->setField($this);
        }

        return $this;
    }

    public function removeChoice(ChoiceItem $choice): self
    {
        if ($this->choices->contains($choice)) {
            $this->choices->removeElement($choice);
            // set the owning side to null (unless already changed)
            if ($choice->getField() === $this) {
                $choice->setField(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|FieldValue[]
     */
    public function getFieldValues(): Collection
    {
        return $this->fieldValues;
    }

    public function addFieldValue(FieldValue $fieldValue): self
    {
        if (!$this->fieldValues->contains($fieldValue)) {
            $this->fieldValues[] = $fieldValue;
            $fieldValue->setField($this);
        }

        return $this;
    }

    public function removeFieldValue(FieldValue $fieldValue): self
    {
        if ($this->fieldValues->contains($fieldValue)) {
            $this->fieldValues->removeElement($fieldValue);
            // set the owning side to null (unless already changed)
            if ($fieldValue->getField() === $this) {
                $fieldValue->setField(null);
            }
        }

        return $this;
    }
}

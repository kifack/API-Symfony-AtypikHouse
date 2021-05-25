<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 *  @ApiResource(iri="http://schema.org/MediaObject", collectionOperations={
 *      "get"={
 *          "path":"/All/categories",
 *          "normalization_context"={"groups"={"read:all_categories"}}
 *    },
 *     "post"={
 *         "security"="is_granted('ROLE_ADMIN')",
 *         "controller"=App\Controller\Api\AddCategoryController::class,
 *         "defaults"={"_api_receive"=false},
 *         "swagger_context" = {
 *            "consumes" = {
 *                "multipart/form-data",
 *             }
 *         }
 *     },
 * "admin_read_categories"={
 *   "method"="GET",
 *   "security"="is_granted('ROLE_ADMIN')",
 *    "path"="/admin/categories",
 *   "normalization_context"={"groups"={"admin:read_categories"}}
 * }
 * })
 * @Vich\Uploadable
 */
class Category
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"admin:read","admin:read_categories","read:all_categories","read:all_fields"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"admin:read","admin:read_categories","read:all_categories","read:all_fields"})
     * @Assert\NotBlank(message="Veuillez renseignez le type d'hébergement")
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Groups({"admin:read","admin:read_categories","read:all_categories"})
     * @Assert\NotBlank(message="Veuillez renseigner une description pour ce type d'éhergement")
     */
    private $description;

    /**
     * @Assert\File(
     *   maxSize = "2048k",
     *   maxSizeMessage = "Le fichier a dépassé la taille maximale",
     *   mimeTypes = {"image/png","image/jpeg","image/jpg"},
     *   mimeTypesMessage = "Selectionner un fichier au format  png/jpeg/jpg "
     * )
     * @Assert\NotNull(message="Veuillez renseigner une image")
     * @Vich\UploadableField(mapping="categories", fileNameProperty="fileName")
     * 
     * @var File|null
     */
    private $imageFile;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"admin:read","admin:read_categories","read:all_categories"})
     */
    private $fileName;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"admin:read","admin:read_categories","read:all_categories"})
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity=Location::class, mappedBy="category")
     */
    private $locations;

    /**
     * @ORM\OneToMany(targetEntity=Field::class, mappedBy="category", orphanRemoval=true)
     */
    private $fields;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="categories")
     */
    private $author;

    public function __construct()
    {
        $this->locations = new ArrayCollection();
        $this->fields = new ArrayCollection();
    }

     /**
     * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
     * of 'UploadedFile' is injected into this setter to trigger the update. If this
     * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
     * must be able to accept an instance of 'File' as the bundle will inject one here
     * during Doctrine hydration.
     *
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile|null $imageFile
     */
    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->createdAt = new \DateTimeImmutable();
        }
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getFileName(): ?string
    {
        return $this->fileName;
    }

    public function setFileName(string $fileName): self
    {
        $this->fileName = $fileName;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection|Location[]
     */
    public function getLocations(): Collection
    {
        return $this->locations;
    }

    public function addLocation(Location $location): self
    {
        if (!$this->locations->contains($location)) {
            $this->locations[] = $location;
            $location->setCategory($this);
        }

        return $this;
    }

    public function removeLocation(Location $location): self
    {
        if ($this->locations->contains($location)) {
            $this->locations->removeElement($location);
            // set the owning side to null (unless already changed)
            if ($location->getCategory() === $this) {
                $location->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Field[]
     */
    public function getFields(): Collection
    {
        return $this->fields;
    }

    public function addField(Field $field): self
    {
        if (!$this->fields->contains($field)) {
            $this->fields[] = $field;
            $field->setCategory($this);
        }

        return $this;
    }

    public function removeField(Field $field): self
    {
        if ($this->fields->contains($field)) {
            $this->fields->removeElement($field);
            // set the owning side to null (unless already changed)
            if ($field->getCategory() === $this) {
                $field->setCategory(null);
            }
        }

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }
}

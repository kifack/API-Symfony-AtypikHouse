<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ApiResource(collectionOperations={
 *          "post"={},
 *          "register_user"={
 *              "method"="POST",
 *              "path"="/users/register",
 *              "controller"=App\Controller\Api\RegisterUserController::class
 *          },
*           "get"={},
            
*           "admin_read_users"={
*           "method"="GET",
*           "security"="is_granted('ROLE_ADMIN')",
*           "path"="/admin/users",
*           "normalization_context"={"groups"={"admin:read_users"}}
* }
*      },
 *      itemOperations={"get","put"={
 *        "security"="is_granted('ROLE_USER') and (object == user )",
 *        "controller"=App\Controller\Api\UpdateUserController::class
 *      },
 *      "patch"={
*        "security"="is_granted('ROLE_ADMIN')",
*       },
*       "read_user"={
*          "method"="get",
*          "path":"/All/users/{id}",
*          "normalization_context"={"groups"={"read:user-profile"}}
*       },
 *      "delete"},
 *     normalizationContext={"groups"={"user:read"}},
 *     denormalizationContext={"groups"={"user:write"}},
 * 
 * )
 * @ApiFilter(SearchFilter::class, properties={"email": "exact"})
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user:read","admin:read_users","read:all_comments","read:user_bookings"})
     * 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user:read","user:write","admin:read_users","read:user-profile","read:all_comments","read:owner_bookings"})
     * @Assert\NotBlank(message="Veuillez renseigner l'adresse mail de l'utilisateur")
     * 
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"user:read","user:write","admin:read_users","read:user-profile"})
     * 
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Groups({"user:write"})
     * @Assert\NotBlank(message="Veuillez renseigner votre mot de passe")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"user:read","user:write","admin:read_users","read:user-profile","read:user_bookings","read:all_comments","read:owner_bookings","read:location"})
     * @Assert\NotBlank(message="Veuillez renseigner votre prénom")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"user:read","user:write","admin:read_users","read:user-profile","read:user_bookings","read:owner_bookings","read:location"})
     * @Assert\NotBlank(message="Veuillez renseigner votre nom")
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"user:read","user:write","read:user-profile"})
     * @Assert\NotBlank(message="Veuillez renseigner votre numéro de téléphone")
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=50,  nullable=true)
     * @Groups({"user:read","user:write","read:user-profile"})
     * 
     */
    private $rue;

    /**
     * @ORM\Column(type="string", length=60,  nullable=true)
     * @Groups({"user:read","user:write","read:user-profile"})
     * 
     */
    private $city;

    
    /**
     * @ORM\Column(type="boolean")
     * @Groups({"user:read","user:write","admin:read_users"})
     * @Groups({"read:user-profile"})
     * 
     */
    private $status;

    /**
     * @ORM\Column(type="date")
     * @Groups({"user:read","user:write","read:user-profile"})
     * @Assert\NotBlank(message="Veuillez renseigner votre date de naissance")
     * 
     */
    private $dateOfBirth;
    /**
     * @ORM\Column(name="date_created", type="datetime",  options={"default":"CURRENT_TIMESTAMP"})
     * @Groups({"user:read","read:user-profile"})
     */
    private $dateCreated;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"user:read","user:write","read:user-profile"})
     */
    private $dateModified;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read","user:write","read:user-profile"})
     */
    private $reference;

    /**
     * @ORM\OneToMany(targetEntity=Location::class, mappedBy="user", orphanRemoval=true)
     * @Groups({"read:user-profile"})
     */
    private $locations;

    /**
     * @ORM\OneToMany(targetEntity=Activity::class, mappedBy="user", orphanRemoval=true)
     * @Groups({"read:user-profile"})
     */
    private $activities;

    /**
     * @ORM\OneToMany(targetEntity=Review::class, mappedBy="user", orphanRemoval=true)
     */
    private $reviews;
    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="author")
     * @Groups({"read:user-profile"})
     */
    private $comments;

    

    /**
     * @ORM\OneToMany(targetEntity=Booking::class, mappedBy="customer")
     * @Groups({"user:read","read:user-profile"})
     */
    private $bookings;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     * @Groups({"read:user-profile"})
     */
    private $zipCode;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"user:read","user:write"})
     * @Assert\NotBlank(message="Veuillez confirmer avoir accepté les conditions générales")
     * @Assert\Type(
     *     type="bool",
     *     message="Cette valeur doit etre un booléen."
     * )
     */
    private $acceptConditionsUser;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"user:read","user:write"})
     *  @Assert\Type(
     *     type="bool",
     *     message="Cette valeur doit etre un booléen."
     * )
     */
    private $acceptReceiveNewsLetters;

    /**
     * @ORM\OneToOne(targetEntity=Outsider::class, mappedBy="legalRepresent", cascade={"persist", "remove"})
     * @Groups({"read:user-profile"})
     */
    private $outsider;

    


    public function __construct(){
        $this->status=1;
        $this->dateCreated = new \DateTime();
        $this->locations = new ArrayCollection();
        $this->activities = new ArrayCollection();
        $this->reviews = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->bookings = new ArrayCollection();
        $this->destinations = new ArrayCollection();
        $this->categories = new ArrayCollection();
        $this->thematics = new ArrayCollection();
       
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getRue(): ?string
    {
        return $this->rue;
    }

    public function setRue(string $rue): self
    {
        $this->rue = $rue;

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


    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getDateOfBirth(): ?\DateTimeInterface
    {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth(\DateTimeInterface $dateOfBirth): self
    {
        $this->dateOfBirth = $dateOfBirth;

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

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(?string $reference): self
    {
        $this->reference = $reference;

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
            $location->setUser($this);
        }

        return $this;
    }

    public function removeLocation(Location $location): self
    {
        if ($this->locations->contains($location)) {
            $this->locations->removeElement($location);
            // set the owning side to null (unless already changed)
            if ($location->getUser() === $this) {
                $location->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Activity[]
     */
    public function getActivities(): Collection
    {
        return $this->activities;
    }

    public function addActivity(Activity $activity): self
    {
        if (!$this->activities->contains($activity)) {
            $this->activities[] = $activity;
            $activity->setUser($this);
        }

        return $this;
    }

    public function removeActivity(Activity $activity): self
    {
        if ($this->activities->contains($activity)) {
            $this->activities->removeElement($activity);
            // set the owning side to null (unless already changed)
            if ($activity->getUser() === $this) {
                $activity->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Review[]
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setUser($this);
        }
        return $this;
    }
    /** 
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setAuthor($this);
        }

        return $this;
    }

    public function removeReview(Review $review): self
    {
        if ($this->reviews->contains($review)) {
            $this->reviews->removeElement($review);
            // set the owning side to null (unless already changed)
            if ($review->getUser() === $this) {
                $review->setUser(null);
            }
        }
        return $this;
    }
    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getAuthor() === $this) {
                $comment->setAuthor(null);
            }
        }

        return $this;
    }

    



    /**
     * @return Collection|Booking[]
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): self
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings[] = $booking;
            $booking->setCustomer($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): self
    {
        if ($this->bookings->contains($booking)) {
            $this->bookings->removeElement($booking);
            // set the owning side to null (unless already changed)
            if ($booking->getCustomer() === $this) {
                $booking->setCustomer(null);
            }
        }

        return $this;
    }

    public function getAcceptConditionsUser(): ?bool
    {
        return $this->acceptConditionsUser;
    }

    public function setAcceptConditionsUser(bool $acceptConditionsUser): self
    {
        $this->acceptConditionsUser = $acceptConditionsUser;
        return $this;
    }
    /**
     * @return Collection|Destination[]
     */
    
    public function getDestinations(): Collection
    {
        return $this->destinations;
    }

    public function addDestination(Destination $destination): self
    {
        if (!$this->destinations->contains($destination)) {
            $this->destinations[] = $destination;
            $destination->setAuthor($this);
        }

        return $this;
    }

    public function getAcceptReceiveNewsLetters(): ?bool
    {
        return $this->acceptReceiveNewsLetters;
    }

    public function setAcceptReceiveNewsLetters(bool $acceptReceiveNewsLetters): self
    {
        $this->acceptReceiveNewsLetters = $acceptReceiveNewsLetters;
        return $this;
    }
    public function removeDestination(Destination $destination): self
    {
        if ($this->destinations->contains($destination)) {
            $this->destinations->removeElement($destination);
            // set the owning side to null (unless already changed)
            if ($destination->getAuthor() === $this) {
                $destination->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
            $category->setAuthor($this);
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        if ($this->categories->contains($category)) {
            $this->categories->removeElement($category);
            // set the owning side to null (unless already changed)
            if ($category->getAuthor() === $this) {
                $category->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Thematic[]
     */
    public function getThematics(): Collection
    {
        return $this->thematics;
    }

    public function addThematic(Thematic $thematic): self
    {
        if (!$this->thematics->contains($thematic)) {
            $this->thematics[] = $thematic;
            $thematic->setAuthor($this);
        }

        return $this;
    }

    public function removeThematic(Thematic $thematic): self
    {
        if ($this->thematics->contains($thematic)) {
            $this->thematics->removeElement($thematic);
            // set the owning side to null (unless already changed)
            if ($thematic->getAuthor() === $this) {
                $thematic->setAuthor(null);
            }
        }

        return $this;
    }

    public function getOutsider(): ?Outsider
    {
        return $this->outsider;
    }

    public function setOutsider(Outsider $outsider): self
    {
        $this->outsider = $outsider;

        // set the owning side of the relation if necessary
        if ($outsider->getLegalRepresent() !== $this) {
            $outsider->setLegalRepresent($this);
        }

        return $this;
    }

   

   

}

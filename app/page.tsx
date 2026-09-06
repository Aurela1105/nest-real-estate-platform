'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Home,
  MapPin,
  Menu,
  Search,
  SlidersHorizontal,
  UserRound,
  X,
} from 'lucide-react'

const BASE_PATH = '/nest-real-estate-platform'

const images = {
  hero: `${BASE_PATH}/img1.jfif`,
  home: `${BASE_PATH}/img2.webp`,
  interior: `${BASE_PATH}/img3.webp`,
  img4: `${BASE_PATH}/img4.jpg`,
  img5: `${BASE_PATH}/img5.webp`,
  img6: `${BASE_PATH}/img6.jpg`,
  img7: `${BASE_PATH}/img7.jpg`,
}

type Property = {
  id: number
  title: string
  location: string
  price: string
  beds: number
  baths: number
  area: string
  tag: string
  photos: string[]
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Villa Solenne',
    location: 'Malibu, California',
    price: '$4,850,000',
    beds: 4,
    baths: 3,
    area: '3,240 sq ft',
    tag: 'Featured',
    photos: [images.hero, images.home, images.interior],
  },
  {
    id: 2,
    title: 'The Glass House',
    location: 'Austin, Texas',
    price: '$1,295,000',
    beds: 3,
    baths: 2,
    area: '2,180 sq ft',
    tag: 'New listing',
    photos: [images.img4, images.img5, images.img6],
  },
  {
    id: 3,
    title: 'No. 14 Penthouse',
    location: 'Miami, Florida',
    price: '$2,750,000',
    beds: 2,
    baths: 2,
    area: '1,890 sq ft',
    tag: 'Private listing',
    photos: [images.img7, images.interior, images.home],
  },
  {
    id: 4,
    title: 'Canyon Retreat',
    location: 'Scottsdale, Arizona',
    price: '$1,875,000',
    beds: 3,
    baths: 3,
    area: '2,760 sq ft',
    tag: 'Open house',
    photos: [images.img5, images.img6, images.img7],
  },
]

/* =========================================================
   AUTH MODAL
========================================================= */

function AuthModal({
  onClose,
  onSignedIn,
}: {
  onClose: () => void
  onSignedIn: (name: string) => void
}) {
  const [mode, setMode] = useState<'sign in' | 'create account'>('sign in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)

    setTimeout(() => {
      onSignedIn(name || email.split('@')[0] || 'Member')
    }, 500)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-primary/60 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        className="my-auto w-full max-w-md rounded-2xl bg-background p-5 shadow-2xl sm:rounded-3xl sm:p-8 md:p-10"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">
              Welcome to NEST
            </p>

            <h2
              id="auth-title"
              className="mt-2 font-serif text-3xl leading-tight sm:mt-3 sm:text-4xl"
            >
              {mode === 'sign in'
                ? 'Good to see you.'
                : 'Make yourself at home.'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary sm:size-10"
            aria-label="Close sign in"
          >
            <X className="size-4 sm:size-5" />
          </button>
        </div>

        <form
          onSubmit={submit}
          className="mt-6 flex flex-col gap-4 sm:mt-8"
        >
          {mode === 'create account' && (
            <label className="text-sm">
              Your name

              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl bg-secondary px-4 py-3.5 text-sm outline-none ring-primary focus:ring-2"
                placeholder="Alex Morgan"
              />
            </label>
          )}

          <label className="text-sm">
            Email address

            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl bg-secondary px-4 py-3.5 text-sm outline-none ring-primary focus:ring-2"
              placeholder="you@example.com"
            />
          </label>

          <label className="text-sm">
            Password

            <input
              required
              minLength={6}
              type="password"
              className="mt-2 w-full rounded-xl bg-secondary px-4 py-3.5 text-sm outline-none ring-primary focus:ring-2"
              placeholder="••••••••"
            />
          </label>

          <button
            className="mt-1 flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm text-primary-foreground disabled:opacity-70"
            disabled={submitted}
          >
            {submitted
              ? 'Welcome to NEST'
              : mode === 'sign in'
                ? 'Sign in'
                : 'Create account'}

            {!submitted && <ArrowRight className="size-4" />}
          </button>
        </form>

        <button
          className="mt-5 w-full px-2 text-center text-sm leading-6 text-muted-foreground underline-offset-4 hover:underline"
          onClick={() =>
            setMode(
              mode === 'sign in'
                ? 'create account'
                : 'sign in',
            )
          }
        >
          {mode === 'sign in'
            ? 'New to NEST? Create an account'
            : 'Already a member? Sign in'}
        </button>
      </div>
    </div>
  )
}

/* =========================================================
   PROPERTY CARD
========================================================= */

function PropertyCard({
  property,
  onOpen,
  saved,
  onSave,
}: {
  property: Property
  onOpen: () => void
  saved: boolean
  onSave: () => void
}) {
  const [photo, setPhoto] = useState(0)

  /*
   * Automatically changes the property's image every 3 seconds.
   */
  useEffect(() => {
    if (property.photos.length <= 1) return

    const interval = setInterval(() => {
      setPhoto((current) => {
        return (current + 1) % property.photos.length
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [property.photos.length])

  const next = (event: React.MouseEvent) => {
    event.stopPropagation()

    setPhoto(
      (current) =>
        (current + 1) % property.photos.length,
    )
  }

  const previous = (event: React.MouseEvent) => {
    event.stopPropagation()

    setPhoto(
      (current) =>
        (current + property.photos.length - 1) %
        property.photos.length,
    )
  }

  return (
    <article
      className="group min-w-0 cursor-pointer"
      onClick={onOpen}
    >
      {/* IMAGE */}
      <div className="relative aspect-[0.9] overflow-hidden rounded-2xl bg-secondary sm:rounded-3xl">
        <img
          src={property.photos[photo]}
          alt={`${property.title}, photo ${photo + 1}`}
          className="size-full object-cover transition-all duration-700 group-hover:scale-105"
        />

        {/* TAG */}
        <span className="absolute left-3 top-3 max-w-[65%] truncate rounded-full bg-background/90 px-3 py-1.5 text-[11px] sm:left-4 sm:top-4 sm:text-xs">
          {property.tag}
        </span>

        {/* SAVE BUTTON */}
        <button
          onClick={(event) => {
            event.stopPropagation()
            onSave()
          }}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/90 transition-transform hover:scale-105 sm:right-4 sm:top-4 sm:size-10"
          aria-label={`${saved ? 'Remove' : 'Save'} ${property.title}`}
        >
          <Bookmark
            className={`size-4 ${
              saved
                ? 'fill-accent text-accent'
                : ''
            }`}
          />
        </button>

        {/* IMAGE CONTROLS */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 sm:inset-x-4 sm:bottom-4">
          <button
            onClick={previous}
            className="grid size-8 shrink-0 place-items-center rounded-full bg-background/90 transition-transform hover:scale-105 sm:size-9"
            aria-label="Previous property photo"
          >
            <ChevronLeft className="size-4" />
          </button>

          <span className="rounded-full bg-background/90 px-2.5 py-1.5 text-[10px] sm:px-3 sm:py-2 sm:text-xs">
            {photo + 1} / {property.photos.length}
          </span>

          <button
            onClick={next}
            className="grid size-8 shrink-0 place-items-center rounded-full bg-background/90 transition-transform hover:scale-105 sm:size-9"
            aria-label="Next property photo"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* PROPERTY INFORMATION */}
      <div className="flex items-start justify-between gap-3 pt-3 sm:pt-4">
        <div className="min-w-0">
          <h3 className="truncate font-serif text-xl sm:text-2xl">
            {property.title}
          </h3>

          <p className="mt-1 flex min-w-0 items-center gap-1 text-xs text-muted-foreground sm:text-sm">
            <MapPin className="size-3 shrink-0" />

            <span className="truncate">
              {property.location}
            </span>
          </p>
        </div>

        <p className="shrink-0 pt-1 text-xs font-medium sm:text-sm">
          {property.price}
        </p>
      </div>

      {/* PROPERTY DETAILS */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-muted-foreground sm:text-xs">
        <span className="flex items-center gap-1">
          <BedDouble className="size-3.5" />
          {property.beds} beds
        </span>

        <span className="flex items-center gap-1">
          <Bath className="size-3.5" />
          {property.baths} baths
        </span>

        <span>{property.area}</span>
      </div>
    </article>
  )
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Page() {
  const [search, setSearch] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [member, setMember] = useState('')
  const [active, setActive] = useState<Property | null>(null)
  const [detailPhoto, setDetailPhoto] = useState(0)

  /* SEARCH */
  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim()

    if (!query) {
      return properties
    }

    return properties.filter((property) =>
      `${property.title} ${property.location}`
        .toLowerCase()
        .includes(query),
    )
  }, [search])

  /* OPEN PROPERTY */
  const open = (property: Property) => {
    setActive(property)
    setDetailPhoto(0)
  }

  /* CLOSE MOBILE MENU */
  const closeMenu = () => {
    setMenuOpen(false)
  }

  /* SCROLL TO PROPERTIES */
  const scrollToProperties = () => {
    document
      .getElementById('properties')
      ?.scrollIntoView({
        behavior: 'smooth',
      })
  }

  return (
    <main
      id="top"
      className="min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="mx-auto flex min-h-17 max-w-360 items-center justify-between px-4 py-4 sm:px-5 sm:py-5 md:px-10 lg:px-16">
        {/* LOGO */}
        <a
          href="#top"
          className="flex items-center gap-2.5 sm:gap-3"
          aria-label="NEST home"
        >
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground sm:size-9">
            <Home className="size-3.5 sm:size-4" />
          </span>

          <span className="font-serif text-xl tracking-tight sm:text-2xl">
            NEST<span className="text-accent">.</span>
          </span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex xl:gap-8">
          <a
            className="text-foreground transition-opacity hover:opacity-70"
            href="#discover"
          >
            Discover
          </a>

          <a
            className="transition-opacity hover:opacity-70"
            href="#properties"
          >
            Properties
          </a>

          <a
            className="transition-opacity hover:opacity-70"
            href="#journal"
          >
            Journal
          </a>

          <a
            className="transition-opacity hover:opacity-70"
            href="#agents"
          >
            Our agents
          </a>
        </nav>

        {/* HEADER ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setAuthOpen(true)}
            className="hidden min-h-10 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm sm:flex"
          >
            <UserRound className="size-4" />

            <span className="max-w-32 truncate">
              {member || 'Sign in'}
            </span>
          </button>

          <button
            onClick={() =>
              setMenuOpen((current) => !current)
            }
            className="grid size-10 place-items-center rounded-full bg-secondary lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE / TABLET NAVIGATION
      ===================================================== */}

      {menuOpen && (
        <nav className="border-y border-border bg-background px-4 py-5 sm:px-5 lg:hidden">
          <div className="mx-auto flex max-w-360 flex-col gap-1">
            <button
              className="flex min-h-11 items-center rounded-xl px-3 text-left text-sm hover:bg-secondary"
              onClick={() => {
                setAuthOpen(true)
                closeMenu()
              }}
            >
              <UserRound className="mr-3 size-4" />

              {member
                ? member
                : 'Sign in / Create account'}
            </button>

            <a
              href="#discover"
              onClick={closeMenu}
              className="flex min-h-11 items-center rounded-xl px-3 text-sm hover:bg-secondary"
            >
              Discover
            </a>

            <a
              href="#properties"
              onClick={closeMenu}
              className="flex min-h-11 items-center rounded-xl px-3 text-sm hover:bg-secondary"
            >
              Properties
            </a>

            <a
              href="#journal"
              onClick={closeMenu}
              className="flex min-h-11 items-center rounded-xl px-3 text-sm hover:bg-secondary"
            >
              Journal
            </a>

            <a
              href="#agents"
              onClick={closeMenu}
              className="flex min-h-11 items-center rounded-xl px-3 text-sm hover:bg-secondary"
            >
              Our agents
            </a>
          </div>
        </nav>
      )}

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative mx-auto max-w-360 px-3 sm:px-5 md:px-10 lg:px-16">
        <div className="relative min-h-142.5 overflow-visible rounded-xl bg-primary sm:min-h-155 sm:rounded-3xl md:min-h-162.5">
          {/* HERO IMAGE */}
          <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-3xl">
            <img
              src={images.hero}
              alt="Beautiful real estate property"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-[center_58%] contrast-110 saturate-105"
            />

            <div className="absolute inset-0 bg-linear-to-r from-primary/85 via-primary/35 to-transparent" />

            <div className="absolute inset-0 bg-linear-to-t from-primary/45 via-transparent to-transparent" />
          </div>

          {/* HERO CONTENT */}
          <div className="relative flex min-h-142.5 max-w-2xl flex-col justify-end gap-5 p-6 pb-36 sm:min-h-155 sm:gap-7 sm:p-8 sm:pb-40 md:min-h-162.5 md:p-14 md:pb-44">
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/75 sm:text-xs sm:tracking-[0.28em] md:text-sm">
              Curated homes. Considered living.
            </p>

            <h1 className="max-w-xl font-serif text-[2.65rem] leading-[0.98] tracking-tight text-primary-foreground sm:text-5xl md:text-7xl">
              Find a place that feels like{' '}
              <em>you.</em>
            </h1>

            <p className="max-w-md text-sm leading-6 text-primary-foreground/80 sm:text-base sm:leading-7">
              A more thoughtful way to discover
              exceptional homes, neighborhoods, and the
              life waiting inside them.
            </p>
          </div>

          {/* SEARCH */}
          <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl bg-background p-2.5 shadow-2xl sm:bottom-5 sm:left-5 sm:right-5 sm:p-3 md:bottom-8 md:left-14 md:right-14 md:flex md:items-center md:gap-3 md:rounded-full">
            {/* SEARCH INPUT */}
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-secondary px-4 py-3.5 md:rounded-full md:px-5 md:py-4">
              <Search className="size-4 shrink-0 text-muted-foreground sm:size-5" />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search city, neighborhood, address"
                className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>

            {/* BUTTONS */}
            <div className="mt-2 grid grid-cols-2 gap-2 md:mt-0 md:flex md:gap-3">
              <button
                onClick={() =>
                  setFiltersOpen(
                    (current) => !current,
                  )
                }
                aria-expanded={filtersOpen}
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm text-primary-foreground sm:px-6"
              >
                <SlidersHorizontal className="size-4" />
                Filters
              </button>

              <button
                onClick={scrollToProperties}
                className="min-h-12 rounded-full bg-accent px-4 text-sm font-medium text-accent-foreground sm:px-7"
              >
                Search homes
              </button>
            </div>
          </div>

          {/* FILTERS */}
          {filtersOpen && (
            <div className="absolute left-4 right-4 top-full z-30 mt-3 rounded-2xl border border-border bg-background p-5 shadow-xl sm:left-auto sm:right-5 sm:w-80 md:right-14">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">
                    Property filters
                  </p>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Use the search field to find homes by
                    city, neighborhood, or property name.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setFiltersOpen(false)
                  }
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary"
                  aria-label="Close filters"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          DISCOVER / PROPERTIES
      ===================================================== */}

      <section
        id="discover"
        className="mx-auto max-w-360 px-5 py-16 sm:py-20 md:px-10 md:py-28 lg:px-16"
      >
        {/* SECTION HEADER */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="min-w-0">
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:mb-4 sm:text-xs sm:tracking-[0.28em]">
              The NEST edit
            </p>

            <h2 className="max-w-xl font-serif text-3xl leading-tight sm:text-5xl md:text-6xl">
              Homes with a little more{' '}
              <em>character.</em>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            We look beyond the listing. These are spaces
            with a point of view, in places you will want
            to stay awhile.
          </p>
        </div>

        {/* PROPERTY COUNT */}
        <div className="mt-10 flex items-center sm:mt-12">
          <p className="text-xs text-muted-foreground sm:text-sm">
            {filtered.length} curated{' '}
            {filtered.length === 1
              ? 'villa'
              : 'villas'}
          </p>
        </div>

        {/* =================================================
            PROPERTY CARDS

            MOBILE  = 1 CARD
            TABLET  = 2 CARDS
            DESKTOP = 4 CARDS

            NO OUTER CAROUSEL BUTTONS
        ================================================= */}

        <div
          id="properties"
          className="mt-6"
        >
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {filtered.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onOpen={() => open(property)}
                  saved={favorites.includes(
                    property.id,
                  )}
                  onSave={() =>
                    setFavorites((current) =>
                      current.includes(property.id)
                        ? current.filter(
                            (id) =>
                              id !== property.id,
                          )
                        : [
                            ...current,
                            property.id,
                          ],
                    )
                  }
                />
              ))}
            </div>
          ) : (
            /* NO RESULTS */
            <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
              <Search className="mx-auto size-8 text-muted-foreground" />

              <h3 className="mt-4 font-serif text-2xl">
                No homes found
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Try searching for another city or
                property name.
              </p>

              <button
                onClick={() => setSearch('')}
                className="mt-5 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          JOURNAL
      ===================================================== */}

      <section
        id="journal"
        className="bg-secondary"
      >
        <div className="mx-auto grid max-w-360 gap-8 px-5 py-16 sm:gap-10 sm:py-20 md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-10 md:py-28 lg:px-16">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:mb-4 sm:text-xs sm:tracking-[0.28em]">
              A better way home
            </p>

            <h2 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
              Space to live
              <br />
              <em>beautifully.</em>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground sm:mt-6">
              From the first search to the final key,
              NEST pairs local knowledge with a more
              human approach to finding home.
            </p>
          </div>

          <img
            src={images.interior}
            alt="Bright modern home interior"
            className="aspect-[1.3] w-full rounded-2xl object-cover sm:rounded-3xl"
          />
        </div>
      </section>

      {/* =====================================================
          AGENTS CTA
      ===================================================== */}

      <section
        id="agents"
        className="mx-auto max-w-360 px-5 py-16 sm:py-20 md:px-10 lg:px-16"
      >
        <div className="flex flex-col gap-8 rounded-2xl bg-primary p-6 text-primary-foreground sm:rounded-3xl sm:p-8 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-primary-foreground/60 sm:mb-4 sm:text-xs sm:tracking-[0.28em]">
              Your next chapter
            </p>

            <h2 className="max-w-lg font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              Let&apos;s find the place that makes sense.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-primary-foreground/70 sm:mt-5">
              Sign in to save homes and connect with one
              of our local experts.
            </p>
          </div>

          <button
            onClick={() => setAuthOpen(true)}
            className="flex min-h-12 w-full shrink-0 items-center justify-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm text-accent-foreground sm:w-auto sm:px-7 sm:py-4"
          >
            {member
              ? 'View saved homes'
              : 'Talk to an expert'}

            <ArrowRight className="size-4" />
          </button>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-360 flex-col gap-4 px-5 py-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-8 md:px-10 lg:px-16">
          <p className="font-serif text-xl text-foreground">
            NEST<span className="text-accent">.</span>
          </p>

          <p className="text-xs sm:text-sm">
            Thoughtful real estate for modern living.
          </p>

          <p className="text-xs sm:text-sm">
            © 2026 NEST Realty
          </p>
        </div>
      </footer>

      {/* =====================================================
          AUTH MODAL
      ===================================================== */}

      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onSignedIn={(name) => {
            setMember(name)
            setAuthOpen(false)
          }}
        />
      )}

      {/* =====================================================
          PROPERTY DETAIL MODAL
      ===================================================== */}

      {active && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-primary/60 p-3 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} details`}
          onClick={() => setActive(null)}
        >
          <div
            className="my-auto max-h-[94vh] w-full max-w-4xl overflow-auto rounded-2xl bg-background sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DETAIL IMAGE */}
            <div className="relative aspect-4/3 overflow-hidden sm:aspect-video">
              <img
                src={active.photos[detailPhoto]}
                alt={`${active.title}, gallery image ${
                  detailPhoto + 1
                }`}
                className="size-full object-cover"
              />

              {/* CLOSE */}
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/90 sm:right-4 sm:top-4 sm:size-10"
                aria-label="Close property details"
              >
                <X className="size-4 sm:size-5" />
              </button>

              {/* PREVIOUS */}
              <button
                onClick={() =>
                  setDetailPhoto(
                    (current) =>
                      (current +
                        active.photos.length -
                        1) %
                      active.photos.length,
                  )
                }
                className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-background/90 sm:left-4 sm:size-10"
                aria-label="Previous property image"
              >
                <ChevronLeft className="size-4 sm:size-5" />
              </button>

              {/* NEXT */}
              <button
                onClick={() =>
                  setDetailPhoto(
                    (current) =>
                      (current + 1) %
                      active.photos.length,
                  )
                }
                className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-background/90 sm:right-4 sm:size-10"
                aria-label="Next property image"
              >
                <ChevronRight className="size-4 sm:size-5" />
              </button>

              {/* IMAGE COUNTER */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-3 py-1.5 text-xs sm:bottom-4">
                {detailPhoto + 1} /{' '}
                {active.photos.length}
              </div>
            </div>

            {/* DETAIL CONTENT */}
            <div className="p-6 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {active.tag}
              </p>

              <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                {active.title}
              </h2>

              <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {active.location}
              </p>

              {/* DETAILS */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-y border-border py-5 text-sm sm:mt-7 sm:gap-5">
                <span>
                  {active.beds} beds
                </span>

                <span>
                  {active.baths} baths
                </span>

                <span>
                  {active.area}
                </span>

                <span className="font-medium">
                  {active.price}
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
                A considered home with generous
                proportions, natural light, and details
                that reward a closer look. Explore every
                angle, then save it to your NEST shortlist.
              </p>

              {/* SAVE PROPERTY */}
              <button
                onClick={() =>
                  setFavorites((current) =>
                    current.includes(active.id)
                      ? current.filter(
                          (id) => id !== active.id,
                        )
                      : [...current, active.id],
                  )
                }
                className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm text-primary-foreground sm:w-auto"
              >
                <Bookmark
                  className={`size-4 ${
                    favorites.includes(active.id)
                      ? 'fill-accent text-accent'
                      : ''
                  }`}
                />

                {favorites.includes(active.id)
                  ? 'Saved to your homes'
                  : 'Save this home'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

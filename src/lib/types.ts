export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type PetType = 'dog' | 'cat' | 'bird' | 'other'
export type PetSize = 'small' | 'medium' | 'large'
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'

export interface Profile {
  id: string
  full_name: string
  phone: string | null
  avatar_url: string | null
  address: string | null
  city: string | null
  created_at: string
  updated_at: string
}

export interface Caregiver {
  id: string
  user_id: string
  bio: string | null
  experience: string | null
  services: string[]
  hourly_rate: number | null
  rating: number
  review_count: number
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface Pet {
  id: string
  owner_id: string
  name: string
  species: string
  breed: string | null
  age: number | null
  weight: number | null
  temperament: string | null
  medical_notes: string | null
  photo_url: string | null
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  description: string | null
  base_price: number
  price_unit: string
  duration_minutes: number | null
  icon: string | null
  is_active: boolean
  created_at: string
}

export interface Booking {
  id: string
  client_id: string
  caregiver_id: string
  service_id: string
  pet_id: string
  start_date: string
  end_date: string | null
  status: BookingStatus
  total_price: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  booking_id: string
  author_id: string
  caregiver_id: string
  rating: number
  comment: string | null
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  is_read: boolean
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      caregivers: {
        Row: Caregiver
        Insert: Omit<Caregiver, 'id' | 'rating' | 'review_count' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Caregiver, 'id' | 'created_at'>>
      }
      pets: {
        Row: Pet
        Insert: Omit<Pet, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Pet, 'id' | 'created_at'>>
      }
      services: {
        Row: Service
        Insert: Omit<Service, 'id' | 'created_at'>
        Update: Partial<Omit<Service, 'id' | 'created_at'>>
      }
      bookings: {
        Row: Booking
        Insert: Omit<Booking, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Booking, 'id' | 'created_at'>>
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, 'id' | 'created_at'>
        Update: Partial<Omit<Review, 'id' | 'created_at'>>
      }
      messages: {
        Row: Message
        Insert: Omit<Message, 'id' | 'created_at'>
        Update: Partial<Omit<Message, 'id' | 'created_at'>>
      }
    }
  }
}

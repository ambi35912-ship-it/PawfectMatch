import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { downloadCalendarEvent } from './utils/calendar';

import DeviceFrame from './components/common/DeviceFrame';
import TopHeader from './components/common/TopHeader';
import BottomNav from './components/common/BottomNav';
import FilterModal from './components/common/FilterModal';
import Toast from './components/common/Toast';
import NavigationModal from './components/common/NavigationModal';
import CallClinicModal from './components/common/CallClinicModal';
import CalendarConnectorModal from './components/common/CalendarConnectorModal';

import SwipeDeck from './components/discover/SwipeDeck';
import PetDetailModal from './components/discover/PetDetailModal';

import MatchCelebrationModal from './components/match/MatchCelebrationModal';

import MatchesList from './components/matches/MatchesList';
import ChatView from './components/matches/ChatView';

import PlaydatesView from './components/playdates/PlaydatesView';
import ScheduleModal from './components/playdates/ScheduleModal';
import ParkDetailsModal from './components/playdates/ParkDetailsModal';

import HealthDashboard from './components/health/HealthDashboard';
import LogWeightModal from './components/health/LogWeightModal';
import AddVaccineModal from './components/health/AddVaccineModal';
import BreedAdvisorModal from './components/health/BreedAdvisorModal';
import ViewCertificateModal from './components/health/ViewCertificateModal';
import UploadCertificateModal from './components/health/UploadCertificateModal';

import ProfileView from './components/profile/ProfileView';
import AddPetModal from './components/profile/AddPetModal';
import EditPetModal from './components/profile/EditPetModal';
import EditProfileModal from './components/profile/EditProfileModal';
import NotificationSettingsModal from './components/profile/NotificationSettingsModal';
import AuthModal from './components/auth/AuthModal';

import { supabase } from './lib/supabaseClient';
import { signOutUser } from './lib/authService';
import { loadAppState, saveAppState } from './lib/appStateService';

import { mockPets as initialPets } from './data/mockPets';
import { initialMatches } from './data/mockMatches';
import { initialPlaydates, petFriendlySpots } from './data/mockPlaydates';
import { userPet as defaultUserPet, secondaryPet } from './data/userPet';

export default function App() {
  // Navigation & Frame
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'matches' | 'playdates' | 'health' | 'profile'
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);

  // Core Data State
  const [pets, setPets] = useState(initialPets);
  const [matches, setMatches] = useState(initialMatches);
  const [playdates, setPlaydates] = useState(initialPlaydates);
  const [spots] = useState(petFriendlySpots);
  const [userPets, setUserPets] = useState([defaultUserPet, secondaryPet]);
  const [activeUserPet, setActiveUserPet] = useState(defaultUserPet);

  // Modals & Sub-views State
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [matchCelebration, setMatchCelebration] = useState(null);
  const [detailModalPet, setDetailModalPet] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [preselectedPet, setPreselectedPet] = useState(null);
  const [preselectedSpot, setPreselectedSpot] = useState(null);

  // Functional Modals State
  const [navigationDestination, setNavigationDestination] = useState(null);
  const [clinicAppointment, setClinicAppointment] = useState(null);
  const [parkModalSpot, setParkModalSpot] = useState(null);
  const [isLogWeightOpen, setIsLogWeightOpen] = useState(false);
  const [isAddVaccineOpen, setIsAddVaccineOpen] = useState(false);
  const [isBreedAdvisorOpen, setIsBreedAdvisorOpen] = useState(false);
  const [isViewCertOpen, setIsViewCertOpen] = useState(false);
  const [isUploadCertOpen, setIsUploadCertOpen] = useState(false);
  const [certModalPet, setCertModalPet] = useState(null);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [isEditPetOpen, setIsEditPetOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  const [isCalendarConnectorOpen, setIsCalendarConnectorOpen] = useState(false);
  const [calendarConnectorEvent, setCalendarConnectorEvent] = useState(null);

  // Supabase Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const persistenceReadyRef = useRef(false);

  // Toast System
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Helper to sync user metadata with pet profile
  const syncUserWithMetadata = (meta) => {
    if (!meta) return;
    if (meta.ownerName) {
      setUserPets((prev) =>
        prev.map((p) => ({
          ...p,
          owner: { ...p.owner, name: meta.ownerName }
        }))
      );
      setActiveUserPet((prev) => ({
        ...prev,
        owner: { ...prev.owner, name: meta.ownerName }
      }));
    }
    if (meta.petName) {
      setActiveUserPet((prev) => ({
        ...prev,
        name: meta.petName
      }));
    }
  };

  // Initialize Supabase Auth session & listen for auth state changes
  useEffect(() => {
    // 1. Initial active session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentSession(session);
      setCurrentUser(session?.user ?? null);
      if (session?.user?.user_metadata) {
        syncUserWithMetadata(session.user.user_metadata);
      }
    });

    // 2. Real-time auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentSession(session);
      const user = session?.user ?? null;
      setCurrentUser(user);

      if (event === 'SIGNED_IN' && user) {
        if (user.user_metadata) {
          syncUserWithMetadata(user.user_metadata);
        }
        showToast('Signed In! 🐾', `Welcome back, ${user.user_metadata?.ownerName || user.email}`, 'sparkles');
      } else if (event === 'SIGNED_OUT') {
        showToast('Signed Out', 'Switched back to Guest Mode', 'info');
      }
    });

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  // Load the signed-in user's RLS-protected snapshot, with local storage as a
  // guest/offline fallback. Reset first so one account never sees another's data.
  useEffect(() => {
    let cancelled = false;
    persistenceReadyRef.current = false;

    const hydrate = async () => {
      const userId = currentUser?.id || null;
      const { state } = await loadAppState(userId);
      if (cancelled) return;

      const nextPets = state?.pets || initialPets;
      const nextMatches = state?.matches || initialMatches;
      const nextPlaydates = state?.playdates || initialPlaydates;
      const nextUserPets = state?.userPets?.length ? state.userPets : [defaultUserPet, secondaryPet];
      const nextActivePet = nextUserPets.find((pet) => pet.id === state?.activeUserPetId) || nextUserPets[0];

      setPets(nextPets);
      setMatches(nextMatches);
      setPlaydates(nextPlaydates);
      setUserPets(nextUserPets);
      setActiveUserPet(nextActivePet);
      persistenceReadyRef.current = true;
    };

    hydrate();
    return () => {
      cancelled = true;
    };
  }, [currentUser?.id]);

  // Debounce persistence so rapid UI interactions do not flood Supabase.
  useEffect(() => {
    if (!persistenceReadyRef.current) return undefined;

    const timeout = window.setTimeout(() => {
      const snapshot = {
        version: 1,
        pets,
        matches,
        playdates,
        userPets,
        activeUserPetId: activeUserPet?.id || null
      };

      saveAppState(currentUser?.id || null, snapshot).catch(() => {
        showToast('Saved locally', 'Cloud sync is unavailable; your changes remain on this device.', 'info');
      });
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [pets, matches, playdates, userPets, activeUserPet?.id, currentUser?.id]);

  const handleSignOut = async () => {
    const res = await signOutUser();
    if (!res.success) {
      showToast('Sign Out Notice', res.error, 'info');
    }
  };

  // Discovery Filters State
  const [filters, setFilters] = useState({
    species: 'all',
    maxDistance: 12,
    energy: 'All',
    size: 'all',
    verifiedVaccinated: true
  });

  // Filtered Pets Calculation
  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      if (filters.species === 'dogs' && pet.species !== 'Dog') return false;
      if (filters.species === 'cats' && pet.species !== 'Cat') return false;
      if (filters.verifiedVaccinated && !pet.vaccinated) return false;
      if (filters.energy !== 'All' && !pet.energyLevel.toLowerCase().includes(filters.energy.toLowerCase())) return false;
      return true;
    });
  }, [pets, filters]);

  // Particle Celebrations
  const triggerCelebrationParticles = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#FF6542', '#F59E0B', '#10B981', '#FFD5C8'],
        disableForReducedMotion: true
      });
    } catch (e) {
      // safe fallback
    }
  };

  // Like Pet Handler (Triggers Match)
  const handleLikePet = (pet) => {
    const existing = matches.find((m) => m.petId === pet.id || m.id === pet.id);
    let matchedItem = existing;

    if (!existing) {
      matchedItem = {
        id: `match_${pet.id}`,
        petId: pet.id,
        petName: pet.name,
        breed: pet.breed,
        avatar: pet.primaryPhoto || (pet.photos && pet.photos[0]),
        ownerName: pet.owner?.name || 'Friendly Parent',
        ownerAvatar: pet.owner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        compatibility: pet.compatibility || 94,
        lastMessage: `You and ${pet.name} matched! Say hello to plan a playdate.`,
        lastMessageTime: 'Just now',
        unread: true,
        hasPlannedPlaydate: false,
        messages: [
          {
            id: `msg_welcome_${Date.now()}`,
            sender: 'them',
            text: `Hi there! ${pet.name} is so excited to meet ${activeUserPet.name}! We saw your profile and loved your play vibe 🐾`,
            time: 'Just now'
          }
        ]
      };
      setMatches((prev) => [matchedItem, ...prev]);
    }

    setMatchCelebration(pet);
    triggerCelebrationParticles();
  };

  // Pass Pet Handler
  const handlePassPet = (pet) => {
    // Advanced cleanly by deck
  };

  // Super Like Handler
  const handleSuperLikePet = (pet) => {
    handleLikePet(pet);
  };

  // Start Chat from Celebration or List
  const handleStartChat = (petOrMatch) => {
    const targetMatch = matches.find(
      (m) => m.petId === petOrMatch.id || m.id === petOrMatch.id || m.petId === petOrMatch.petId
    ) || matches[0];

    setSelectedConversation(targetMatch);
    setActiveTab('matches');
    setMatchCelebration(null);
  };

  // Open Schedule Playdate Modal
  const handleOpenSchedule = (pet = null, spot = null) => {
    setPreselectedPet(pet);
    setPreselectedSpot(spot);
    setIsScheduleModalOpen(true);
  };

  // Save new Playdate
  const handleSavePlaydate = (newPlaydate, targetPet) => {
    setPlaydates((prev) => [newPlaydate, ...prev]);

    if (targetPet) {
      setMatches((prevMatches) =>
        prevMatches.map((m) => {
          if (m.id === targetPet.id || m.petId === targetPet.id || m.petId === targetPet.petId) {
            return {
              ...m,
              hasPlannedPlaydate: true,
              lastMessage: `Playdate confirmed for ${newPlaydate.date}!`,
              lastMessageTime: 'Just now',
              messages: [
                ...(m.messages || []),
                {
                  id: `invite_${Date.now()}`,
                  type: 'playdate_invite',
                  sender: 'me',
                  status: 'accepted',
                  title: newPlaydate.title,
                  location: newPlaydate.locationName,
                  address: newPlaydate.address,
                  dateTime: `${newPlaydate.date} • ${newPlaydate.time}`,
                  time: 'Just now'
                }
              ]
            };
          }
          return m;
        })
      );
    }

    showToast('Playdate Scheduled! 🎾', `Meetup set with ${newPlaydate.petName} for ${newPlaydate.date}`, 'sparkles');
    setActiveTab('playdates');
  };

  // Open Calendar Connector Modal (Google, Apple, Outlook & Email)
  const handleOpenCalendarConnector = (event) => {
    setCalendarConnectorEvent(event);
    setIsCalendarConnectorOpen(true);
  };

  // Add To Calendar Action (Directly triggers Connector Modal with Email and Providers)
  const handleAddToCalendar = ({ title, location, description, startDate, endDate }) => {
    setCalendarConnectorEvent({ title, location, description, startDate, endDate });
    setIsCalendarConnectorOpen(true);
  };

  // Synchronize and persist match messages
  const handleUpdateMatchMessages = useCallback((matchId, updatedMessages) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === matchId
          ? {
              ...m,
              messages: updatedMessages,
              lastMessage: updatedMessages[updatedMessages.length - 1]?.text || m.lastMessage
            }
          : m
      )
    );
    setSelectedConversation((prev) => {
      if (!prev || prev.id !== matchId) return prev;
      return {
        ...prev,
        messages: updatedMessages,
        lastMessage: updatedMessages[updatedMessages.length - 1]?.text || prev.lastMessage
      };
    });
  }, []);

  // Open Chat Conversation
  const handleOpenConversation = useCallback((match) => {
    setSelectedConversation(match);
    try {
      window.history.pushState({ inChat: true, matchId: match.id }, '');
    } catch (e) {
      // Ignore in environments without window.history
    }
  }, []);

  // Close Chat Conversation & return cleanly to matches list
  const handleCloseConversation = useCallback(() => {
    setSelectedConversation(null);
  }, []);

  // Native browser / phone back gesture support to exit chat cleanly
  useEffect(() => {
    const handlePopState = () => {
      setSelectedConversation(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Edit Active Pet Profile
  const handleEditPet = (updatedPet) => {
    setActiveUserPet(updatedPet);
    setUserPets((prev) =>
      prev.map((p) => (p.id === updatedPet.id ? updatedPet : p))
    );
    showToast('Pet Profile Updated! ✨', `${updatedPet.name}'s bio & traits saved`, 'sparkles');
  };

  // Turn-by-turn navigation
  const handleNavigate = (dest) => {
    setNavigationDestination(dest);
  };

  // Veterinary clinic call modal
  const handleCallClinic = (appointment) => {
    setClinicAppointment(appointment);
  };

  // Park Spot Details
  const handleViewSpotDetails = (spotOrLocation) => {
    if (!spotOrLocation) return;
    const searchName = (spotOrLocation.name || spotOrLocation.locationName || spotOrLocation.location || '').toLowerCase();

    // Fuzzy matching against spots database
    const matchedSpot = spots.find((s) => {
      const sName = s.name.toLowerCase();
      if (searchName && (sName.includes(searchName) || searchName.includes(sName))) return true;
      const keywords = ['cubbon', 'carter', 'therpup', 'lodhi', 'koregaon', 'whitefield', 'bandra', 'indiranagar'];
      return keywords.some((k) => sName.includes(k) && searchName.includes(k));
    });

    const fallbackSpot = {
      id: spotOrLocation.id || `spot_${Date.now()}`,
      name: spotOrLocation.name || spotOrLocation.location || spotOrLocation.locationName || 'Cubbon Park Canine Play Zone',
      type: spotOrLocation.type || 'Fenced Dog Park',
      rating: spotOrLocation.rating || 4.9,
      reviewsCount: spotOrLocation.reviewsCount || 482,
      distance: spotOrLocation.distance || '1.2 km',
      image: spotOrLocation.image || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
      address: spotOrLocation.address || 'Kasturba Road, Bengaluru, Karnataka',
      amenities: spotOrLocation.amenities && spotOrLocation.amenities.length > 0
        ? spotOrLocation.amenities
        : ['Double Gated', 'Fresh Water Troughs', 'Canopy Shade Benches', 'Dedicated Off-Leash Area'],
      popularHours: spotOrLocation.popularHours || 'Open daily 6:00 AM - 10:00 PM',
      playdateTitle: spotOrLocation.title,
      playdateDateTime: spotOrLocation.dateTime,
      partnerName: spotOrLocation.partnerName,
      partnerOwner: spotOrLocation.partnerOwner,
      status: spotOrLocation.status
    };

    if (matchedSpot) {
      setParkModalSpot({
        ...matchedSpot,
        playdateTitle: spotOrLocation.title,
        playdateDateTime: spotOrLocation.dateTime,
        partnerName: spotOrLocation.partnerName,
        partnerOwner: spotOrLocation.partnerOwner,
        status: spotOrLocation.status
      });
    } else {
      setParkModalSpot(fallbackSpot);
    }
  };

  // Pet Switcher
  const handleSelectPet = (pet) => {
    setActiveUserPet(pet);
    showToast(`Switched Active Pet`, `${pet.name} is now active in Discovery & Health`, 'sparkles');
  };

  // Add New Pet
  const handleAddPet = (newPet) => {
    setUserPets((prev) => [...prev, newPet]);
    setActiveUserPet(newPet);
    showToast('Pet Registered! 🐾', `${newPet.name} added to your family profile`, 'sparkles');
  };

  // Edit Profile
  const handleEditProfile = (updatedOwner) => {
    setUserPets((prev) =>
      prev.map((p) => ({
        ...p,
        owner: { ...p.owner, ...updatedOwner }
      }))
    );
    setActiveUserPet((prev) => ({
      ...prev,
      owner: { ...prev.owner, ...updatedOwner }
    }));
    showToast('Profile Updated', 'Your parent profile details have been saved', 'success');
  };

  // Profile: Update Pet Photo
  const handleUpdatePetPhoto = (photoUrl) => {
    setActiveUserPet((prev) => ({
      ...prev,
      avatar: photoUrl,
      photos: [photoUrl, ...(prev.photos ? prev.photos.slice(1) : [])]
    }));
    setUserPets((prev) =>
      prev.map((p) =>
        p.id === activeUserPet.id
          ? { ...p, avatar: photoUrl, photos: [photoUrl, ...(p.photos ? p.photos.slice(1) : [])] }
          : p
      )
    );
    showToast('Profile Photo Updated 📸', `${activeUserPet.name}'s picture refreshed`, 'success');
  };

  // Health: Open View Certificate
  const handleOpenViewCert = (pet) => {
    setCertModalPet(pet || activeUserPet);
    setIsViewCertOpen(true);
  };

  // Health: Open Upload Certificate
  const handleOpenUploadCert = (pet) => {
    setCertModalPet(pet || activeUserPet);
    setIsUploadCertOpen(true);
  };

  // Health: Save Uploaded / Renewed Certificate
  const handleSaveCertificate = (certData) => {
    const targetPetId = certModalPet?.id || activeUserPet.id;
    setActiveUserPet((prev) => {
      if (prev.id === targetPetId) {
        return {
          ...prev,
            health: {
              ...prev.health,
              status: certData.verified ? 'Verified' : 'Pending Review',
              vaccineCertificate: certData
          }
        };
      }
      return prev;
    });
    setUserPets((prev) =>
      prev.map((p) =>
        p.id === targetPetId
          ? {
              ...p,
              health: {
                ...p.health,
                status: certData.verified ? 'Verified' : 'Pending Review',
                vaccineCertificate: certData
              }
            }
          : p
      )
    );
    showToast('Certificate submitted', `Review is pending for ${certModalPet?.name || activeUserPet.name}`, 'info');
  };

  // Health: Log Weight
  const handleSaveWeight = ({ month, weight }) => {
    setActiveUserPet((prev) => {
      const updatedHistory = [...prev.health.weightHistory, { month, weight }];
      return {
        ...prev,
        weight: `${weight} lbs`,
        health: {
          ...prev.health,
          weightHistory: updatedHistory
        }
      };
    });
    setUserPets((prevPets) =>
      prevPets.map((p) =>
        p.id === activeUserPet.id
          ? {
              ...p,
              weight: `${weight} lbs`,
              health: {
                ...p.health,
                weightHistory: [...p.health.weightHistory, { month, weight }]
              }
            }
          : p
      )
    );
    showToast('Weight Logged', `Recorded ${weight} lbs for ${month}`, 'success');
  };

  // Health: Add Vaccine
  const handleAddVaccine = (newVax) => {
    setActiveUserPet((prev) => ({
      ...prev,
      health: {
        ...prev.health,
        vaccinations: [...prev.health.vaccinations, newVax]
      }
    }));
    setUserPets((prevPets) =>
      prevPets.map((p) =>
        p.id === activeUserPet.id
          ? {
              ...p,
              health: {
                ...p.health,
                vaccinations: [...p.health.vaccinations, newVax]
              }
            }
          : p
      )
    );
    showToast('Vaccine Passport Updated', `Added ${newVax.name}`, 'success');
  };

  // Health: Toggle Medication
  const handleToggleMed = (medId) => {
    let medName = 'Medication';
    let isGiven = false;

    setActiveUserPet((prev) => {
      const updatedMeds = prev.health.medications.map((m) => {
        if (m.id === medId) {
          medName = m.name;
          isGiven = !m.given;
          return { ...m, given: !m.given };
        }
        return m;
      });
      return {
        ...prev,
        health: {
          ...prev.health,
          medications: updatedMeds
        }
      };
    });

    showToast(
      isGiven ? 'Medication Administered' : 'Marked Incomplete',
      `${medName} ${isGiven ? 'marked as given today' : 'unmarked'}`,
      isGiven ? 'success' : 'info'
    );
  };

  return (
    <DeviceFrame isDeviceFrame={isDeviceFrame}>
      
      {/* Dynamic Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Header */}
      <TopHeader
        activeTab={activeTab}
        userPet={activeUserPet}
        onOpenFilter={() => setIsFilterOpen(true)}
        isDeviceFrame={isDeviceFrame}
        setIsDeviceFrame={setIsDeviceFrame}
        onOpenProfile={() => setActiveTab('profile')}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Screen Content based on Active Tab */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
        {/* Discover Screen (Hero Swipe Deck) */}
        {activeTab === 'discover' && (
          <SwipeDeck
            pets={filteredPets}
            onLikePet={handleLikePet}
            onPassPet={handlePassPet}
            onSuperLikePet={handleSuperLikePet}
            onOpenDetails={(pet) => setDetailModalPet(pet)}
            onResetDeck={() => {
              setPets(initialPets);
              showToast('Stack Reset', 'Pet discovery deck refreshed with all nearby playmates', 'info');
            }}
          />
        )}

        {/* Matches & Chat Screen */}
        {activeTab === 'matches' && (
          selectedConversation ? (
            <ChatView
              match={selectedConversation}
              userPet={activeUserPet}
              isAuthenticated={!!currentUser}
              onBack={handleCloseConversation}
              onSchedulePlaydate={(match) => handleOpenSchedule(match)}
              onViewParkDetails={handleViewSpotDetails}
              onAddToCalendar={handleAddToCalendar}
              onNavigate={handleNavigate}
              onUpdateMessages={handleUpdateMatchMessages}
            />
          ) : (
            <MatchesList
              matches={matches}
              onSelectConversation={handleOpenConversation}
              onSelectNewMatch={handleOpenConversation}
            />
          )
        )}

        {/* Playdates Calendar & Spots */}
        {activeTab === 'playdates' && (
          <PlaydatesView
            playdates={playdates}
            spots={spots}
            onOpenScheduleModal={() => handleOpenSchedule()}
            onSelectSpot={(spot) => handleOpenSchedule(null, spot)}
            onNavigate={handleNavigate}
            onViewSpotDetails={handleViewSpotDetails}
          />
        )}

        {/* Health Dashboard */}
        {activeTab === 'health' && (
          <HealthDashboard
            userPet={activeUserPet}
            onCallClinic={handleCallClinic}
            onAddToCalendar={handleAddToCalendar}
            onOpenLogWeight={() => setIsLogWeightOpen(true)}
            onOpenAddVaccine={() => setIsAddVaccineOpen(true)}
            onToggleMed={handleToggleMed}
            onOpenBreedAdvisor={() => setIsBreedAdvisorOpen(true)}
            onViewCertificate={handleOpenViewCert}
            onUploadCertificate={handleOpenUploadCert}
          />
        )}

        {/* Profile & Settings */}
        {activeTab === 'profile' && (
          <ProfileView
            userPet={activeUserPet}
            userPets={userPets}
            onSelectPet={handleSelectPet}
            isDeviceFrame={isDeviceFrame}
            setIsDeviceFrame={setIsDeviceFrame}
            onOpenDiscoverySettings={() => setIsFilterOpen(true)}
            onOpenAddPet={() => setIsAddPetOpen(true)}
            onOpenEditPet={() => setIsEditPetOpen(true)}
            onOpenEditProfile={() => setIsEditProfileOpen(true)}
            onOpenNotificationSettings={() => setIsNotificationSettingsOpen(true)}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSignOut={handleSignOut}
            onUpdatePetPhoto={handleUpdatePetPhoto}
            onViewCertificate={handleOpenViewCert}
            onUploadCertificate={handleOpenUploadCert}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'matches' && selectedConversation) {
            handleCloseConversation();
          } else {
            setActiveTab(tab);
            if (tab !== 'matches') {
              handleCloseConversation();
            }
          }
        }}
        unreadCount={matches.filter((m) => m.unread).length}
        upcomingCount={playdates.length}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={(newFilters) => {
          setFilters(newFilters);
          showToast('Filters Applied', 'Discovery deck updated based on your preferences', 'info');
        }}
      />

      {/* Full Pet Detail Sheet / Modal */}
      <PetDetailModal
        pet={detailModalPet}
        isOpen={!!detailModalPet}
        onClose={() => setDetailModalPet(null)}
        onLike={(pet) => {
          handleLikePet(pet);
          setDetailModalPet(null);
        }}
        onPass={(pet) => {
          handlePassPet(pet);
          setDetailModalPet(null);
        }}
        onSchedulePlaydate={(pet) => {
          setDetailModalPet(null);
          handleOpenSchedule(pet);
        }}
        onViewCertificate={(pet) => handleOpenViewCert(pet)}
      />

      {/* "It's a Match!" Celebration Screen */}
      <MatchCelebrationModal
        isOpen={!!matchCelebration}
        matchedPet={matchCelebration}
        userPet={activeUserPet}
        onClose={() => setMatchCelebration(null)}
        onStartChat={handleStartChat}
        onPlanPlaydate={(pet) => {
          setMatchCelebration(null);
          handleOpenSchedule(pet);
        }}
      />

      {/* Schedule Playdate Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false);
          setPreselectedPet(null);
          setPreselectedSpot(null);
        }}
        matches={matches}
        spots={spots}
        preselectedPet={preselectedPet}
        preselectedSpot={preselectedSpot}
        onSavePlaydate={handleSavePlaydate}
      />

      {/* Navigation Modal */}
      <NavigationModal
        isOpen={!!navigationDestination}
        onClose={() => setNavigationDestination(null)}
        destination={navigationDestination}
      />

      {/* Call Clinic Simulator Modal */}
      <CallClinicModal
        isOpen={!!clinicAppointment}
        onClose={() => setClinicAppointment(null)}
        appointment={clinicAppointment}
      />

      {/* Park Details Modal */}
      <ParkDetailsModal
        isOpen={!!parkModalSpot}
        onClose={() => setParkModalSpot(null)}
        spot={parkModalSpot}
        onNavigate={handleNavigate}
        onScheduleHere={(spot) => handleOpenSchedule(null, spot)}
      />

      {/* Log Weight Modal */}
      <LogWeightModal
        isOpen={isLogWeightOpen}
        onClose={() => setIsLogWeightOpen(false)}
        onSaveWeight={handleSaveWeight}
        currentWeight={activeUserPet.weight}
      />

      {/* Add Vaccine Modal */}
      <AddVaccineModal
        isOpen={isAddVaccineOpen}
        onClose={() => setIsAddVaccineOpen(false)}
        onAddVaccine={handleAddVaccine}
      />

      {/* Smart Breed Health Advisor Modal */}
      <BreedAdvisorModal
        isOpen={isBreedAdvisorOpen}
        onClose={() => setIsBreedAdvisorOpen(false)}
        currentBreed={activeUserPet.breed}
        onAddToCalendar={handleAddToCalendar}
      />

      {/* Add Pet Modal */}
      <AddPetModal
        isOpen={isAddPetOpen}
        onClose={() => setIsAddPetOpen(false)}
        onAddPet={handleAddPet}
        currentUserId={currentUser?.id}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        owner={activeUserPet.owner}
        onSave={handleEditProfile}
      />

      {/* Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={isNotificationSettingsOpen}
        onClose={() => setIsNotificationSettingsOpen(false)}
        onSave={(settings) => {
          showToast('Preferences Saved', 'Push alerts & reminder channels updated', 'success');
        }}
      />

      {/* Supabase Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
        }}
        onGuestContinue={() => {
          showToast('Guest Mode', 'Exploring with demo pet family', 'info');
        }}
      />

      {/* View Veterinary Certificate Modal */}
      <ViewCertificateModal
        isOpen={isViewCertOpen}
        onClose={() => {
          setIsViewCertOpen(false);
          setCertModalPet(null);
        }}
        pet={certModalPet || activeUserPet}
      />

      {/* Upload / Renew Veterinary Certificate Modal */}
      <UploadCertificateModal
        isOpen={isUploadCertOpen}
        onClose={() => {
          setIsUploadCertOpen(false);
          setCertModalPet(null);
        }}
        pet={certModalPet || activeUserPet}
        onSaveCertificate={handleSaveCertificate}
        currentUserId={currentUser?.id}
      />

      {/* Calendar Connector & Email Invite Modal */}
      <CalendarConnectorModal
        isOpen={isCalendarConnectorOpen}
        onClose={() => {
          setIsCalendarConnectorOpen(false);
          setCalendarConnectorEvent(null);
        }}
        event={calendarConnectorEvent}
      />

      {/* Edit Pet Profile Modal */}
      <EditPetModal
        isOpen={isEditPetOpen}
        onClose={() => setIsEditPetOpen(false)}
        pet={activeUserPet}
        onSavePet={handleEditPet}
      />

    </DeviceFrame>
  );
}

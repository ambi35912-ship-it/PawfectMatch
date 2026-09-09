export const userPet = {
  id: 'user_milo',
  name: 'Milo',
  species: 'Dog',
  breed: 'Golden Retriever',
  age: '2.5 yrs',
  gender: 'Male',
  weight: '68 lbs',
  weightGoal: '66-70 lbs',
  neutered: true,
  avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
  photos: [
    'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
  ],
  personality: ['Playful', 'Water Lover', 'Gentle Giant', 'Ball Obsessed'],
  playStyle: 'High-energy Fetch & Gentle Romping',
  energyLevel: 'High',
  size: 'Large',
  neighborhood: 'Marina District, San Francisco',
  owner: {
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verified: true,
    memberSince: 'March 2024',
    responseRate: '100%',
    preferredTimes: 'Weekday evenings (5-7 PM), Weekend mornings'
  },
  health: {
    status: 'Optimal',
    vaccinations: [
      {
        name: 'Rabies (3-Year)',
        date: 'Oct 14, 2025',
        validUntil: 'Oct 2028',
        status: 'valid',
        clinic: 'Bay Area Pet Hospital',
        doctor: 'Dr. Sarah Chen, DVM',
        address: '2240 Lombard St, San Francisco, CA',
        phone: '(415) 555-0192',
        lotNumber: 'LOT-RAB-9921'
      },
      {
        name: 'DHPP (Distemper, Parvo)',
        date: 'Jan 10, 2026',
        validUntil: 'Jan 2027',
        status: 'valid',
        clinic: 'Marina Vet Clinic',
        doctor: 'Dr. Michael Rodriguez, DVM',
        address: '1820 Chestnut St, San Francisco, CA',
        phone: '(415) 555-0144',
        lotNumber: 'LOT-DHP-4412'
      },
      {
        name: 'Bordetella (Kennel Cough)',
        date: 'Feb 02, 2026',
        validUntil: 'Aug 2026',
        status: 'valid',
        clinic: 'Marina Vet Clinic',
        doctor: 'Dr. Michael Rodriguez, DVM',
        address: '1820 Chestnut St, San Francisco, CA',
        phone: '(415) 555-0144',
        lotNumber: 'LOT-BOR-8821'
      },
      {
        name: 'Leptospirosis',
        date: 'Nov 18, 2025',
        validUntil: 'Nov 2026',
        status: 'valid',
        clinic: 'Bay Area Pet Hospital',
        doctor: 'Dr. Sarah Chen, DVM',
        address: '2240 Lombard St, San Francisco, CA',
        phone: '(415) 555-0192',
        lotNumber: 'LOT-LEP-3301'
      },
    ],
    upcomingAppointments: [
      { title: 'Annual Wellness & Dental Exam', date: 'Sat, Mar 28, 2026 at 10:30 AM', doctor: 'Dr. Sarah Chen, DVM', clinic: 'Bay Area Pet Hospital', address: '2240 Lombard St, San Francisco' }
    ],
    medications: [
      { id: 'med_1', name: 'NexGard Plus (Flea & Tick)', frequency: 'Monthly chewable', dueDay: '15th of each month', status: 'due_soon', given: false },
      { id: 'med_2', name: 'Omega-3 Fish Oil Drops', frequency: 'Daily with dinner', dueDay: 'Daily', status: 'completed', given: true },
      { id: 'med_3', name: 'Glucosamine Joint Treat', frequency: 'Daily morning', dueDay: 'Daily', status: 'completed', given: true },
    ],
    weightHistory: [
      { month: 'Oct', weight: 66.2 },
      { month: 'Nov', weight: 67.0 },
      { month: 'Dec', weight: 67.8 },
      { month: 'Jan', weight: 68.4 },
      { month: 'Feb', weight: 68.1 },
      { month: 'Mar', weight: 68.0 }
    ],
    dailyActivity: {
      activeMinutes: 78,
      activeGoal: 90,
      steps: 8420,
      playSessions: 3,
      calories: 420
    },
    vaccineCertificate: {
      id: 'cert_milo_2026',
      documentName: 'Milo_Rabies_DHPP_Official_Certificate.pdf',
      clinicName: 'Bay Area Pet Hospital',
      doctor: 'Dr. Sarah Chen, DVM',
      licenseNumber: 'CA-VET #48812',
      issueDate: 'Jan 10, 2026',
      expiryDate: 'Oct 14, 2028',
      verified: true,
      verifiedAt: 'Jan 10, 2026',
      status: 'Confirmed & Valid',
      previewUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      coreVaccines: ['Rabies (3-Year)', 'DHPP Core Shot', 'Bordetella', 'Leptospirosis']
    }
  }
};

export const secondaryPet = {
  id: 'user_coco',
  name: 'Coco',
  species: 'Dog',
  breed: 'French Bulldog',
  age: '1.5 yrs',
  gender: 'Female',
  weight: '24 lbs',
  weightGoal: '22-26 lbs',
  neutered: true,
  avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
  photos: [
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80'
  ],
  personality: ['Goofy', 'Affectionate', 'Snort King', 'Cafe Lounger'],
  playStyle: 'Short Zoomies & Belly Rub Sessions',
  energyLevel: 'Moderate',
  size: 'Small',
  neighborhood: 'Marina District, San Francisco',
  owner: {
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verified: true,
    memberSince: 'March 2024',
    responseRate: '100%',
    preferredTimes: 'Weekday evenings (5-7 PM), Weekend mornings'
  },
  health: {
    status: 'Optimal',
    vaccinations: [
      {
        name: 'Rabies (1-Year Booster)',
        date: 'Dec 05, 2025',
        validUntil: 'Dec 2026',
        status: 'valid',
        clinic: 'Marina Vet Clinic',
        doctor: 'Dr. Michael Rodriguez, DVM',
        address: '1820 Chestnut St, San Francisco, CA',
        phone: '(415) 555-0144',
        lotNumber: 'LOT-RAB-1102'
      },
      {
        name: 'DHPP Core Shot',
        date: 'Dec 05, 2025',
        validUntil: 'Dec 2026',
        status: 'valid',
        clinic: 'Marina Vet Clinic',
        doctor: 'Dr. Michael Rodriguez, DVM',
        address: '1820 Chestnut St, San Francisco, CA',
        phone: '(415) 555-0144',
        lotNumber: 'LOT-DHP-9041'
      },
    ],
    upcomingAppointments: [],
    medications: [
      { id: 'med_c1', name: 'Simparica Trio Chewable', frequency: 'Monthly', dueDay: '1st of month', status: 'completed', given: true }
    ],
    weightHistory: [
      { month: 'Nov', weight: 23.2 },
      { month: 'Dec', weight: 23.8 },
      { month: 'Jan', weight: 24.1 },
      { month: 'Feb', weight: 24.0 },
      { month: 'Mar', weight: 24.2 }
    ],
    dailyActivity: {
      activeMinutes: 52,
      activeGoal: 60,
      steps: 5400,
      playSessions: 2,
      calories: 210
    },
    vaccineCertificate: {
      id: 'cert_coco_2026',
      documentName: 'Coco_Official_Vaccination_Record.pdf',
      clinicName: 'Marina Vet Clinic',
      doctor: 'Dr. Michael Rodriguez, DVM',
      licenseNumber: 'CA-VET #39104',
      issueDate: 'Jan 15, 2026',
      expiryDate: 'Nov 12, 2028',
      verified: true,
      verifiedAt: 'Jan 15, 2026',
      status: 'Confirmed & Valid',
      previewUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      coreVaccines: ['Rabies (3-Year)', 'DHPP Core Shot']
    }
  }
};

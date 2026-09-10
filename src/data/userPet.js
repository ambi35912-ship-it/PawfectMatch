export const userPet = {
  id: 'user_milo',
  name: 'Milo',
  species: 'Dog',
  breed: 'Golden Retriever',
  age: '2.5 yrs',
  gender: 'Male',
  weight: '31 kg',
  weightGoal: '30-33 kg',
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
  neighborhood: 'Indiranagar, Bengaluru, Karnataka',
  owner: {
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verified: true,
    memberSince: 'March 2024',
    responseRate: '100%',
    preferredTimes: 'Weekday mornings (6:30-8 AM), Weekend visits to Cubbon Park'
  },
  health: {
    status: 'Optimal',
    vaccinations: [
      {
        name: 'Rabies (3-Year)',
        date: 'Oct 14, 2025',
        validUntil: 'Oct 2028',
        status: 'valid',
        clinic: 'Cessna Lifeline Veterinary Hospital',
        doctor: 'Dr. Priya Sharma, BVSc & AH',
        address: '148, 1st Cross, Domlur 2nd Stage, Bengaluru, Karnataka 560071',
        phone: '+91 80 4115 1234',
        lotNumber: 'LOT-RAB-9921'
      },
      {
        name: 'DHPP (Distemper, Parvo)',
        date: 'Jan 10, 2026',
        validUntil: 'Jan 2027',
        status: 'valid',
        clinic: 'Cessna Lifeline Veterinary Hospital',
        doctor: 'Dr. Priya Sharma, BVSc & AH',
        address: '148, 1st Cross, Domlur 2nd Stage, Bengaluru, Karnataka 560071',
        phone: '+91 80 4115 1234',
        lotNumber: 'LOT-DHP-4412'
      },
      {
        name: 'Bordetella (Kennel Cough)',
        date: 'Feb 02, 2026',
        validUntil: 'Aug 2026',
        status: 'valid',
        clinic: 'Cessna Lifeline Veterinary Hospital',
        doctor: 'Dr. Priya Sharma, BVSc & AH',
        address: '148, 1st Cross, Domlur 2nd Stage, Bengaluru, Karnataka 560071',
        phone: '+91 80 4115 1234',
        lotNumber: 'LOT-BOR-8821'
      },
      {
        name: 'Leptospirosis',
        date: 'Nov 18, 2025',
        validUntil: 'Nov 2026',
        status: 'valid',
        clinic: 'Cessna Lifeline Veterinary Hospital',
        doctor: 'Dr. Priya Sharma, BVSc & AH',
        address: '148, 1st Cross, Domlur 2nd Stage, Bengaluru, Karnataka 560071',
        phone: '+91 80 4115 1234',
        lotNumber: 'LOT-LEP-3301'
      },
    ],
    upcomingAppointments: [
      { title: 'Annual Wellness & Tropical Deworming', date: 'Sat, Mar 28, 2026 at 10:30 AM', doctor: 'Dr. Priya Sharma, BVSc & AH', clinic: 'Cessna Lifeline Veterinary Hospital', address: '148, 1st Cross, Domlur 2nd Stage, Bengaluru' }
    ],
    medications: [
      { id: 'med_1', name: 'NexGard Spectra (Flea & Tick)', frequency: 'Monthly chewable', dueDay: '15th of each month', status: 'due_soon', given: false },
      { id: 'med_2', name: 'Omega-3 Salmon Oil Drops', frequency: 'Daily with dinner', dueDay: 'Daily', status: 'completed', given: true },
      { id: 'med_3', name: 'Glucosamine Hip & Joint Chew', frequency: 'Daily morning', dueDay: 'Daily', status: 'completed', given: true },
    ],
    weightHistory: [
      { month: 'Oct', weight: 30.1 },
      { month: 'Nov', weight: 30.4 },
      { month: 'Dec', weight: 30.8 },
      { month: 'Jan', weight: 31.2 },
      { month: 'Feb', weight: 31.0 },
      { month: 'Mar', weight: 31.0 }
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
      clinicName: 'Cessna Lifeline Veterinary Hospital',
      doctor: 'Dr. Priya Sharma, BVSc & AH',
      licenseNumber: 'VCI Reg #KAR-2021-8842',
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
  weight: '11 kg',
  weightGoal: '10-12 kg',
  neutered: true,
  avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
  photos: [
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80'
  ],
  personality: ['Goofy', 'Affectionate', 'Snort King', 'Cafe Lounger'],
  playStyle: 'Short Zoomies & Belly Rub Sessions',
  energyLevel: 'Moderate',
  size: 'Small',
  neighborhood: 'Bandra West, Mumbai, Maharashtra',
  owner: {
    name: 'Arjun Mehta',
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
        clinic: 'Crown Vet Mumbai',
        doctor: 'Dr. Rajesh Kulkarni, MVSc',
        address: 'Worli Sea Face, Mumbai, Maharashtra 400018',
        phone: '+91 22 2490 8822',
        lotNumber: 'LOT-RAB-1102'
      },
      {
        name: 'DHPP Core Shot',
        date: 'Dec 05, 2025',
        validUntil: 'Dec 2026',
        status: 'valid',
        clinic: 'Crown Vet Mumbai',
        doctor: 'Dr. Rajesh Kulkarni, MVSc',
        address: 'Worli Sea Face, Mumbai, Maharashtra 400018',
        phone: '+91 22 2490 8822',
        lotNumber: 'LOT-DHP-9041'
      },
    ],
    upcomingAppointments: [],
    medications: [
      { id: 'med_c1', name: 'Simparica Trio Chewable', frequency: 'Monthly', dueDay: '1st of month', status: 'completed', given: true }
    ],
    weightHistory: [
      { month: 'Nov', weight: 10.6 },
      { month: 'Dec', weight: 10.8 },
      { month: 'Jan', weight: 11.0 },
      { month: 'Feb', weight: 11.0 },
      { month: 'Mar', weight: 11.1 }
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
      clinicName: 'Crown Vet Mumbai',
      doctor: 'Dr. Rajesh Kulkarni, MVSc',
      licenseNumber: 'VCI Reg #MAH-2019-4412',
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

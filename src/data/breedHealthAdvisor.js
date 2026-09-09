/**
 * Evidence-based Breed & Age-Specific Pet Health and Vaccination Guidelines
 * Formulated from AAHA (American Animal Hospital Association) & AVMA standards.
 */

export const breedProfiles = {
  'Golden Retriever': {
    predispositions: [
      'Hip & Elbow Dysplasia (Annual mobility check)',
      'Subaortic Stenosis / Cardiac murmur screening',
      'Atopic Dermatitis & Ear infections (high water affinity)',
      'Cancer watch & baseline blood chemistry'
    ],
    lifestyleRisk: 'High social dog-park & open water exposure (requires frequent Bordetella & Leptospirosis boosters)',
    recommendedCare: [
      {
        id: 'rec_gold_1',
        title: 'Bordetella (Kennel Cough) Social Booster',
        category: 'Vaccine',
        dueInDays: 21,
        dueDate: 'Mar 30, 2026',
        urgency: 'high',
        reason: 'Recommended every 6 months for active dog-park visitors like Milo who visit Alta Plaza & Crissy Field.',
        recommendedFrequency: 'Every 6 months for social park dogs',
        procedure: 'Intranasal or oral vaccine'
      },
      {
        id: 'rec_gold_2',
        title: 'Annual 4Dx Plus Heartworm & Tick Screen',
        category: 'Diagnostic Bloodwork',
        dueInDays: 35,
        dueDate: 'Apr 14, 2026',
        urgency: 'medium',
        reason: 'Golden Retrievers frequently roam tall grass in Presidio trails; tests for Lyme, Anaplasma, Ehrlichia & Heartworm.',
        recommendedFrequency: 'Annual screening',
        procedure: 'Quick in-clinic blood draw'
      },
      {
        id: 'rec_gold_3',
        title: 'Biannual Orthopedic Mobility & Joint Exam',
        category: 'Exam',
        dueInDays: 80,
        dueDate: 'May 28, 2026',
        urgency: 'normal',
        reason: 'At 2.5 years, assessing range of motion in hips and stifles ensures early joint cartilage preservation.',
        recommendedFrequency: 'Annual or biannual mobility check',
        procedure: 'Range-of-motion palpation & gait analysis'
      }
    ]
  },
  'French Bulldog': {
    predispositions: [
      'Brachycephalic Obstructive Airway Syndrome (BOAS)',
      'Intervertebral Disc Disease (IVDD) / Spine health',
      'Skin fold dermatitis & environmental allergies',
      'Heat sensitivity & respiratory monitoring'
    ],
    lifestyleRisk: 'Moderate energy; highly sensitive to warm weather and elevated respiratory distress',
    recommendedCare: [
      {
        id: 'rec_french_1',
        title: 'Canine Influenza (CIV H3N2/H3N8) Booster',
        category: 'Vaccine',
        dueInDays: 14,
        dueDate: 'Mar 23, 2026',
        urgency: 'high',
        reason: 'Brachycephalic breeds have narrower airways; CIV protection is essential to prevent secondary pneumonia.',
        recommendedFrequency: 'Annual booster',
        procedure: 'Subcutaneous injection'
      },
      {
        id: 'rec_french_2',
        title: 'Upper Airway & Nares Evaluation',
        category: 'Exam',
        dueInDays: 45,
        dueDate: 'Apr 24, 2026',
        urgency: 'medium',
        reason: 'Annual check of soft palate and stenotic nares to ensure unhindered airflow during zoomies.',
        recommendedFrequency: 'Annual exam',
        procedure: 'Non-invasive oral and respiratory assessment'
      },
      {
        id: 'rec_french_3',
        title: 'Cytology Check & Skin Fold Cleansing Review',
        category: 'Preventive Care',
        dueInDays: 60,
        dueDate: 'May 09, 2026',
        urgency: 'normal',
        reason: 'Prevents fungal and yeast overgrowth in facial wrinkles and tail pocket.',
        recommendedFrequency: 'Biannual check',
        procedure: 'Dermatological swab check'
      }
    ]
  },
  'Australian Shepherd': {
    predispositions: [
      'MDR1 Gene Mutation (Multi-Drug Sensitivity)',
      'Collie Eye Anomaly & Progressive Retinal Atrophy',
      'Hip Dysplasia & high-strain athletic soft-tissue injuries'
    ],
    lifestyleRisk: 'Extremely high athletic endurance; prone to joint wear and disc injuries from aerial frisbee catches',
    recommendedCare: [
      {
        id: 'rec_aussie_1',
        title: 'Annual Canine Eye Registry (CAER) Exam',
        category: 'Specialist Exam',
        dueInDays: 28,
        dueDate: 'Apr 06, 2026',
        urgency: 'medium',
        reason: 'Recommended for herding breeds to check for early lens and retinal clarity.',
        recommendedFrequency: 'Annual exam',
        procedure: 'Ophthalmic slit-lamp examination'
      },
      {
        id: 'rec_aussie_2',
        title: 'Leptospirosis 4-Way Booster',
        category: 'Vaccine',
        dueInDays: 42,
        dueDate: 'Apr 20, 2026',
        urgency: 'high',
        reason: 'Crucial for trail and creek running dogs exposed to wildlife puddles.',
        recommendedFrequency: 'Annual booster',
        procedure: 'Subcutaneous injection'
      }
    ]
  },
  'Default Dog': {
    predispositions: [
      'Dental Calculus & Periodontal Disease (affects 80% of dogs over age 3)',
      'Parasitic infestation (Flea, Tick, Heartworm)',
      'Core immunity maintenance'
    ],
    lifestyleRisk: 'Standard community social interactions require annual core vaccination and preventive protection',
    recommendedCare: [
      {
        id: 'rec_def_1',
        title: 'Annual Wellness Examination & Dental Grade',
        category: 'Exam',
        dueInDays: 30,
        dueDate: 'Apr 09, 2026',
        urgency: 'medium',
        reason: 'Comprehensive nose-to-tail physical exam, lymph node check, and dental tartar grading.',
        recommendedFrequency: 'Annual checkup',
        procedure: 'Full physical examination'
      },
      {
        id: 'rec_def_2',
        title: 'DHPP / Core Booster',
        category: 'Vaccine',
        dueInDays: 90,
        dueDate: 'Jun 08, 2026',
        urgency: 'normal',
        reason: 'Protects against Distemper, Hepatitis, Parvovirus, and Parainfluenza.',
        recommendedFrequency: 'Every 1-3 years based on antibody titer',
        procedure: 'Core vaccine injection'
      }
    ]
  }
};

/**
 * Returns customized health & vaccine checklist based on pet's breed and age
 */
export function getBreedHealthAdvisor(pet) {
  const breedName = pet?.breed || 'Golden Retriever';
  const profile = breedProfiles[breedName] || breedProfiles['Golden Retriever'] || breedProfiles['Default Dog'];

  // Parse age string (e.g. "2.5 yrs", "1 yr")
  const ageYears = parseFloat(pet?.age) || 2.5;

  let ageGroup = 'Adult (1-6 yrs)';
  let ageBadge = 'Prime Vitality';
  let ageSpecialAdvice = 'Annual comprehensive physical, social vaccine boosters, and proactive joint nutrition.';

  if (ageYears < 1) {
    ageGroup = 'Puppy (< 1 yr)';
    ageBadge = 'Growth & Booster Phase';
    ageSpecialAdvice = 'Core 8-12-16 week puppy series, early socialization clearance, and microchip verification.';
  } else if (ageYears >= 7) {
    ageGroup = 'Senior (7+ yrs)';
    ageBadge = 'Golden Years Wellness';
    ageSpecialAdvice = 'Biannual (every 6 months) comprehensive senior bloodwork, renal screening, and arthritis management.';
  }

  return {
    breedName,
    ageYears,
    ageGroup,
    ageBadge,
    ageSpecialAdvice,
    predispositions: profile.predispositions,
    lifestyleRisk: profile.lifestyleRisk,
    recommendedCare: profile.recommendedCare
  };
}

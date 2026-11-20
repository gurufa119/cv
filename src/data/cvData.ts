export type ProjectVisualType =
  | 'ar-geometry'
  | 'akm-numeracy'
  | 'gwe-ecosystem'
  | 'video-calculus'
  | 'pmm-curriculum'
  | 'function-plotter';

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  institution: string;
  summary: string;
  description: string;
  mathFocus: string;
  digitalTools: string[];
  outcomes: string[];
  visualType: ProjectVisualType;
  featured?: boolean;
  externalUrl?: string;
}

export interface EducationItem {
  level: string;
  period: string;
  institution: string;
  major: string;
  gpa: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  focus: string;
}

export interface TeachingItem {
  period: string;
  school: string;
  role: string;
  active?: boolean;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  description: string;
  active?: boolean;
}

export interface AwardItem {
  rank: string;
  title: string;
  organizer: string;
  year: string;
}

export interface SpeakerTopic {
  title: string;
  subtitle?: string;
  years: string;
  institutions: string[];
}

export const PROFILE = {
  name: 'M. Faisal Abduh, M.Pd.',
  shortName: 'M. Faisal Abduh',
  initials: 'FA',
  role: 'Guru Matematika',
  school: 'SMA Negeri 1 Kersana',
  subtitle: 'ASN & Edukreator · Praktisi Digitalisasi Pembelajaran',
  location: 'Kab. Brebes, Jawa Tengah',
  email: 'gurufa@sman1kersana.sch.id',
  phoneDisplay: '0823-3320-2141',
  whatsappUrl: 'https://wa.me/6282333202141',
  lynkUrl: 'https://lynk.id/gurufa',
  lynkLabel: 'lynk.id/gurufa',
  instagramHandle: '@pakical.buida',
  instagramUrl: 'https://instagram.com/pakical.buida',
  photoUrl: 'https://main.sman1kersana.sch.id/wp-content/uploads/2024/01/m.-faisal-abduh.jpeg',
  quote:
    'Saya seorang guru matematika di SMA Negeri 1 Kersana, pribadi yang menyukai tantangan, energik dan memiliki kemauan belajar tinggi terutama di bidang pemanfaatan teknologi untuk pendidikan. Bagi saya, pendidikan itu tidak mengubah dunia tetapi mengubah manusia dan manusia itulah yang akan mengubah dunia.',
};

export const HERO_METRICS = [
  {value: '13+', label: 'Tahun Mengajar', detail: 'Sejak 2013 di SMA & SMK'},
  {value: '5', label: 'Sertifikasi Resmi', detail: 'PPG, PGP, ACT & Numerasi'},
  {value: '20+', label: 'Instansi Mitra', detail: 'Narasumber & Pelatihan IHT'},
  {value: '6', label: 'Karya Portofolio', detail: 'Media Digital & Kurikulum'},
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'ar-geometri-3d',
    title: 'Modul Geometri Ruang 3D & Augmented Reality',
    category: 'Media AR & 3D',
    year: '2025',
    role: 'Perancang Media & Assemblr Certified Trainer',
    institution: 'SMA Negeri 1 Kersana',
    summary:
      'Visualisasi bangun ruang tiga dimensi interaktif berbasis Augmented Reality untuk membantu siswa memahami jarak titik, garis, dan bidang secara spasial.',
    description:
      'Proyek ini menjawab tantangan abstraknya materi Dimensi Tiga di kelas XII SMA. Dengan memadukan proyeksi 3D interaktif dan penanda Augmented Reality melalui Assemblr Edu, siswa dapat memutar jaring-jaring kubus, limas, dan bidang irisan langsung dari perangkat masing-masing.',
    mathFocus: 'Dimensi Tiga · Proyeksi Ortogonal · Vektor Ruang',
    digitalTools: ['Assemblr Edu', 'GeoGebra 3D', 'Canva', 'QR Interactive Sheet'],
    outcomes: [
      'Mempercepat pemahaman spasial siswa pada topik jarak titik ke bidang',
      'Menjadi materi praktik baik pada pelatihan Assemblr Edu untuk guru sejawat',
      'Dapat diakses lintas perangkat (Android, iOS, dan peramban web kelas)',
    ],
    visualType: 'ar-geometry',
    featured: true,
    externalUrl: 'https://lynk.id/gurufa',
  },
  {
    id: 'akm-numerasi-portal',
    title: 'Bank Soal & Klinik Literasi Numerasi Kontekstual',
    category: 'Literasi Numerasi',
    year: '2026',
    role: 'Fasilitator Daerah Literasi Numerasi',
    institution: 'BBPMP Jawa Tengah & SMAN 1 Kersana',
    summary:
      'Paket instrumen asesmen numerasi berbasis konteks lokal dan analisis grafik data untuk melatih penalaran matematis siswa SMA.',
    description:
      'Dirancang untuk memperkuat kemampuan penalaran siswa dalam menghadapi Asesmen Nasional (ANBK) dan pemecahan masalah kehidupan sehari-hari. Setiap soal memuat stimulus data autentik, rubrik berpikir tingkat tinggi (HOTS), serta umpan balik langkah penyelesaian.',
    mathFocus: 'Statistika Deskriptif · Peluang · Pemodelan Aljabar',
    digitalTools: ['Google Forms', 'Looker Studio', 'Spreadsheet Otomatis', 'Quizizz'],
    outcomes: [
      'Menyediakan pemetaan kompetensi numerasi per domain konten secara otomatis',
      'Mengintegrasikan konteks sosial-budaya dan ekonomi lokal Kab. Brebes',
      'Digunakan dalam pendampingan penguatan literasi numerasi tingkat daerah',
    ],
    visualType: 'akm-numeracy',
    featured: true,
    externalUrl: 'https://lynk.id/gurufa',
  },
  {
    id: 'ekosistem-gwe-belajarid',
    title: 'Ekosistem Kelas Digital Terpadu Akun Belajar.id',
    category: 'Platform Digital',
    year: '2024',
    role: 'Partner Co-Kapten Belajar.id & Waka Kurikulum',
    institution: 'Belajar.id · Kab. Brebes',
    summary:
      'Arsitektur kolaborasi pembelajaran tanpa kertas menggunakan Google Workspace for Education untuk pengelolaan kelas, presensi, dan portofolio siswa.',
    description:
      'Mengintegrasikan Google Classroom, Google Sites, Drive Bersama, dan otomatisasi dokumen untuk menciptakan alur belajar yang terstruktur antara guru, siswa, dan manajemen kurikulum sekolah. Model ini juga didiseminasikan melalui program IHT di berbagai sekolah mitra.',
    mathFocus: 'Manajemen Data Nilai · Analisis Ketuntasan · Logika Alur',
    digitalTools: ['Google Workspace', 'Akun Belajar.id', 'Google Sites', 'Apps Script'],
    outcomes: [
      'Standarisasi repositori bahan ajar dan asesmen digital tingkat satuan pendidikan',
      'Meningkatkan pemanfaatan akun belajar.id oleh pendidik dan peserta didik',
      'Memangkas waktu rekapitulasi administrasi evaluasi pembelajaran',
    ],
    visualType: 'gwe-ecosystem',
    externalUrl: 'https://lynk.id/gurufa',
  },
  {
    id: 'video-interaktif-kalkulus',
    title: 'Seri Video Pembelajaran Interaktif Kalkulus & Trigonometri',
    category: 'Video Pembelajaran',
    year: '2022',
    role: 'Edukreator & Pemateri IHT',
    institution: 'MGMP & Sekolah Mitra Jawa Tengah',
    summary:
      'Rangkaian video micro-learning dengan sisipan pertanyaan pemahaman otomatis di tengah alur tontonan menggunakan Edpuzzle dan YouTube.',
    description:
      'Mengatasi pembelajaran satu arah pada video rekaman biasa dengan menyematkan pos pemeriksaan konsep (concept checkpoint) di detik-detik krusial penurunan rumus limit, turunan, dan identitas trigonometri. Siswa wajib menjawab sebelum melanjutkan video.',
    mathFocus: 'Limit Fungsi · Turunan Aljabar · Identitas Trigonometri',
    digitalTools: ['Canva Video', 'YouTube', 'Edpuzzle', 'OBS Studio'],
    outcomes: [
      'Menjaga fokus belajar mandiri siswa dengan kuis interaktif tertanam',
      'Menghasilkan laporan diagnostik bagian materi yang paling sering keliru',
      'Menjadi studi kasus utama pada IHT Pembelajaran Inovatif Berbasis Video',
    ],
    visualType: 'video-calculus',
    externalUrl: 'https://lynk.id/gurufa',
  },
  {
    id: 'dashboard-kurikulum-pmm',
    title: 'Portal Kurikulum Merdeka & Aksi Nyata PMM',
    category: 'Kurikulum & PMM',
    year: '2024',
    role: 'Wakil Kepala Sekolah Bidang Kurikulum',
    institution: 'SMA Negeri 1 Kersana & Sekolah Mitra',
    summary:
      'Sistem terpusat perangkat ajar Kurikulum Merdeka, jadwal P5, serta panduan kurasi bahan ajar digital untuk Platform Merdeka Mengajar.',
    description:
      'Mendukung transformasi tata kelola kurikulum sekolah agar guru lebih mudah berkolaborasi menyusun Modul Ajar, Alur Tujuan Pembelajaran (ATP), serta menyelesaikan topik pelatihan mandiri dan aksi nyata pada Platform Merdeka Mengajar (PMM).',
    mathFocus: 'Pemetaan CP–TP–ATP · Penjadwalan Matriks · Evaluasi Kurikulum',
    digitalTools: ['Platform Merdeka Mengajar', 'Microsoft 365', 'Google Sites', 'Canva'],
    outcomes: [
      'Mempercepat akselerasi penyelesaian topik pelatihan mandiri guru',
      'Transparansi perangkat pembelajaran dan dokumentasi Projek Penguatan Profil Pelajar Pancasila',
      'Didiseminasikan pada berbagai IHT sekolah di wilayah Brebes dan Tegal',
    ],
    visualType: 'pmm-curriculum',
    externalUrl: 'https://lynk.id/gurufa',
  },
  {
    id: 'simulasi-fungsi-kurva',
    title: 'Eksplorator Grafik Fungsi & Transformasi Geometri',
    category: 'Media AR & 3D',
    year: '2023',
    role: 'Pengembang Media Matematika Interaktif',
    institution: 'Komunitas Pengembang Digitalisasi Pembelajaran (KPDP)',
    summary:
      'Lembar eksplorasi dinamis untuk mengamati pengaruh koefisien terhadap kurva fungsi kuadrat, gelombang sinus, dan transformasi koordinat.',
    description:
      'Membantu siswa menemukan pola matematis secara induktif (discovery learning) sebelum menghafal rumus. Perubahan parameter secara langsung mengubah kurva, titik puncak, serta garis singgung pada bidang Kartesius digital.',
    mathFocus: 'Fungsi Kuadrat · Transformasi Geometri · Gradien Garis Singgung',
    digitalTools: ['Desmos', 'GeoGebra Classic', 'HTML5 Canvas', 'Office 365'],
    outcomes: [
      'Mengubah pendekatan hafalan rumus menjadi eksplorasi visual berbasis penemuan',
      'Terintegrasi dengan lembar kerja digital kolaboratif siswa',
      'Diterapkan dalam kelas matematika wajib dan peminatan SMA',
    ],
    visualType: 'function-plotter',
    externalUrl: 'https://lynk.id/gurufa',
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    level: 'Magister (S-2)',
    period: '2014 s.d 2019',
    institution: 'Universitas Negeri Semarang',
    major: 'S-2 Pendidikan Matematika',
    gpa: '3,44',
  },
  {
    level: 'Sarjana (S-1)',
    period: '2009 s.d 2013',
    institution: 'Universitas Negeri Semarang',
    major: 'S-1 Pendidikan Matematika',
    gpa: '3,58',
  },
];

export const CERTIFICATION_LIST: CertificationItem[] = [
  {
    title: 'Fasilitator Daerah Literasi Numerasi',
    issuer: 'BBPMP Jawa Tengah',
    year: '2026',
    focus: 'Penguatan Numerasi & Asesmen',
  },
  {
    title: 'Assemblr Certified Trainer (ACT)',
    issuer: 'Assemblr Edu',
    year: '2025',
    focus: 'Media Pembelajaran 3D & Augmented Reality',
  },
  {
    title: 'Pendidikan Guru Penggerak (PGP)',
    issuer: 'Angkatan 8 · Kemendikbudristek',
    year: '2023',
    focus: 'Kepemimpinan Pembelajaran',
  },
  {
    title: 'Trainer Office 365',
    issuer: 'BPTIK Dikbud Jawa Tengah',
    year: '2018',
    focus: 'Produktivitas & Kelas Digital',
  },
  {
    title: 'Pendidikan Profesi Guru (PPG)',
    issuer: 'Universitas Negeri Semarang (UNNES)',
    year: '2018',
    focus: 'Sertifikasi Pendidik Matematika',
  },
];

export const TEACHING_EXPERIENCE: TeachingItem[] = [
  {
    period: '2021 – sekarang',
    school: 'SMA Negeri 1 Kersana',
    role: 'Guru Matematika · Unit Kerja Aktif',
    active: true,
  },
  {
    period: '2013 s.d 2020',
    school: 'SMKS Amilia Paguyangan',
    role: 'Guru Matematika',
  },
  {
    period: '2013 s.d 2018',
    school: 'SMA Negeri 1 Bumiayu',
    role: 'Guru Matematika',
  },
];

export const LEADERSHIP_EXPERIENCE: ExperienceItem[] = [
  {
    period: 'Februari 2024 s.d sekarang',
    role: 'Partner Co-Kapten',
    organization: 'Belajar.id',
    description: 'Pendampingan aktivasi dan optimalisasi ekosistem akun pembelajaran digital.',
    active: true,
  },
  {
    period: 'Juli 2023 s.d sekarang',
    role: 'Waka Kurikulum',
    organization: 'SMA Negeri 1 Kersana',
    description: 'Pengelolaan kurikulum satuan pendidikan, asesmen, dan implementasi Kurikulum Merdeka.',
    active: true,
  },
  {
    period: 'Komunitas Profesional',
    role: 'Pengembang Pembelajaran Digital',
    organization: 'Komunitas Pengembang Digitalisasi Pembelajaran (KPDP) Jateng',
    description: 'Kolaborasi inovasi dan diseminasi media belajar digital di Jawa Tengah.',
  },
  {
    period: 'Juli 2016 s.d Juni 2019',
    role: 'Waka Kurikulum',
    organization: 'SMKS Amilia Paguyangan',
    description: 'Koordinasi perencanaan pembelajaran kejuruan dan jadwal akademik.',
  },
  {
    period: 'Juli 2016 s.d Juni 2018',
    role: 'Pembina OSIS',
    organization: 'SMA Negeri 1 Bumiayu',
    description: 'Pembinaan organisasi kesiswaan, kepemimpinan pelajar, dan kegiatan ekstrakurikuler.',
  },
];

export const AWARDS_LIST: AwardItem[] = [
  {
    rank: 'Runner-Up',
    title: 'Duta Teknologi Jateng PembaTIK',
    organizer: 'PembaTIK Kemendikbudristek',
    year: '2022',
  },
  {
    rank: 'Guru Inovatif',
    title: 'Ruangkelas by Ruangguru',
    organizer: 'Ruangguru',
    year: '2021',
  },
  {
    rank: 'Terbaik 1',
    title: 'Latsar CPNS Pemprov Jateng',
    organizer: 'Pemerintah Provinsi Jawa Tengah',
    year: '2019',
  },
];

export const SPEAKER_TOPICS: SpeakerTopic[] = [
  {
    title: 'IHT Penyusunan Bahan Ajar Digital Platform Merdeka Mengajar (PMM)',
    years: '2023, 2024',
    institutions: ['SMA Negeri 1 Paguyangan', 'SMKS Amilia Paguyangan', 'SMA Negeri 1 Bantarkawung'],
  },
  {
    title: 'IHT Pendampingan Penyelesaian Topik Pelatihan Mandiri PMM',
    years: '2023',
    institutions: ['SMKS Bhakti Praja Margasari', 'SMKS Peristek Pangkah'],
  },
  {
    title: 'IHT Pembelajaran Inovatif Berbasis Video',
    subtitle: 'Menggunakan Canva, YouTube, dan Edpuzzle',
    years: '2021, 2022',
    institutions: ['SMA Negeri 1 Bumiayu', 'SMA Negeri 1 Bantarkawung', 'SMAS BU NU Bumiayu'],
  },
  {
    title: 'IHT Pembelajaran Jarak Jauh (PJJ) dengan Google Workspace for Education (GWE)',
    years: '2020, 2022',
    institutions: [
      'SMPS Nurusshibyan Paguyangan',
      'SMA Negeri 1 Paguyangan',
      'SMA Negeri 1 Bantarkawung',
      'SMAS Nurul Huda Paguyangan',
      'SMAS Al Hikmah Sirampog',
    ],
  },
  {
    title: 'Pembekalan Praktik Pengalaman Lapangan (PPL)',
    years: '2020, 2021',
    institutions: ['Universitas Peradaban'],
  },
  {
    title: 'ToT Pembelajaran Tanpa Batas Office 365',
    years: '2018, 2019',
    institutions: [
      'Universitas Peradaban',
      'SMA Negeri 1 Bumiayu',
      'SMKS Amilia Paguyangan',
      'SMKS Maarif NU Paguyangan',
      'SMP Negeri 1 Tegal',
      'SMAS Al Hikmah Sirampog',
      'MGMP Matematika SMA Kab. Brebes',
    ],
  },
];

/**
 * Spanish/English copy for every section.
 *
 * Per the design brief, the band name, "Rock and Roll from Tulum", the album
 * name "Serpientes", and platform names (Spotify/YouTube/Apple Music) stay
 * identical in both locales — everything else is translated.
 */

export type Locale = "es" | "en";

export interface Dictionary {
  header: {
    cta: string;
  };
  hero: {
    ethos: string;
    tagline: string;
    escuchar: string;
    lista: string;
    scrollCue: string;
  };
  escuchar: {
    eyebrow: string;
    label: string;
    copy: string;
    youtube: string;
    appleMusic: string;
    more: string;
  };
  ver: {
    eyebrow: string;
    headline: string;
    copy: string;
    playAria: (title: string) => string;
  };
  lista: {
    eyebrow: string;
    headline: string;
    hook: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phoneOptional: string;
    phonePlaceholder: string;
    consent: string;
    submit: string;
    submitting: string;
    privacy: string;
    confirmScript: string;
    confirmCopy: string;
    errors: {
      email: string;
      consent: string;
      network: string;
    };
  };
  fechas: {
    eyebrow: string;
    emptyHeadline: string;
    emptyCopy: string;
    cta: string;
    listedHeadline: string;
    tickets: string;
    details: string;
    event: {
      backToDates: string;
      when: string;
      where: string;
      lineup: string;
      cover: string;
      free: string;
      coverTBA: string;
      presentedBy: string;
      timeTBA: string;
      otherDates: string;
    };
  };
  nosotros: {
    eyebrow: string;
    headline: string;
    bio: string;
    roles: {
      vocals: string;
      guitar: string;
      bass: string;
      drums: string;
    };
  };
  prensa: {
    eyebrow: string;
    headline: string;
    copy: string;
    contacto: string;
    pressKit: string;
    whatsapp: string;
  };
  footer: {
    script: string;
    copyright: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  es: {
    header: {
      cta: "Únete a la lista",
    },
    hero: {
      ethos: "Pertenecemos a un planeta lejano, las Serpientes son un dios",
      tagline: "Rock and Roll from Tulum",
      escuchar: "Escuchar",
      lista: "Únete a la lista",
      scrollCue: "Serpientes · 2025",
    },
    escuchar: {
      eyebrow: "Escuchar",
      label: "Álbum · 2025",
      copy: "Nuestro álbum más reciente. Trece canciones grabadas entre Tulum y Buenos Aires, con la esencia cruda y potente de la banda. Un nuevo álbum llega en 2026.",
      youtube: "YouTube",
      appleMusic: "Apple Music",
      more: "Más plataformas",
    },
    ver: {
      eyebrow: "Ver",
      headline: "No Sé Quién Soy",
      copy: "Nuestro video oficial. Crudo y potente, como suena la banda en vivo. La sesión en el jardín llega pronto.",
      playAria: (title) => `Reproducir: ${title}`,
    },
    lista: {
      eyebrow: "Únete a la lista",
      headline: "Entra al culto",
      hook: "Acceso anticipado al nuevo álbum y al cortometraje. Primeras fechas, rituales y secretos, directo a tu correo y tu teléfono.",
      emailLabel: "Correo",
      emailPlaceholder: "tu@correo.com",
      phoneLabel: "Teléfono para SMS",
      phoneOptional: "(opcional)",
      phonePlaceholder: "+52 ...",
      consent: "Acepto recibir correos y mensajes de Caribbean Voodoo. Puedo salir del culto cuando quiera.",
      submit: "Unirme",
      submitting: "Enviando…",
      privacy:
        "Usamos tu correo y teléfono solo para enviarte noticias de la banda. Guardamos tus datos en Klaviyo y nunca los vendemos. Puedes darte de baja en cualquier momento desde cualquier mensaje. Pueden aplicar tarifas de mensajes y datos.",
      confirmScript: "Ya eres de los nuestros",
      confirmCopy: "Serás de los primeros en recibir el nuevo álbum, el cortometraje y las primeras fechas. Bienvenido a Caribbean Voodoo.",
      errors: {
        email: "Ingresa un correo válido",
        consent: "Confirma que aceptas unirte al culto",
        network: "Algo salió mal. Intenta de nuevo.",
      },
    },
    fechas: {
      eyebrow: "Fechas",
      emptyHeadline: "Nuevas fechas muy pronto",
      emptyCopy: "La banda vuelve a la carretera. Sé de los primeros en saber dónde y cuándo.",
      cta: "Avísame primero",
      listedHeadline: "Próximas fechas",
      tickets: "Boletos",
      details: "Ver",
      event: {
        backToDates: "← Todas las fechas",
        when: "Cuándo",
        where: "Dónde",
        lineup: "Alineación",
        cover: "Cover",
        free: "Sin cover",
        coverTBA: "Por confirmar",
        presentedBy: "Presenta",
        timeTBA: "Horario por confirmar",
        otherDates: "Otras fechas",
      },
    },
    nosotros: {
      eyebrow: "Nosotros",
      headline: "Nacidos en Tulum",
      bio: "Caribbean Voodoo nació en febrero de 2020, antes de la pandemia, con el rock en la piel. Lo que empezó como covers se volvió sonido propio, crudo y potente, grabado en casa entre la selva. Cuatro almas, un mismo dios.",
      roles: {
        vocals: "Voz",
        guitar: "Guitarra",
        bass: "Bajo",
        drums: "Batería",
      },
    },
    prensa: {
      eyebrow: "Booking y prensa",
      headline: "Para bookers y prensa",
      copy: "Fechas, festivales, entrevistas y material. Escríbenos y toma el press kit.",
      contacto: "Contacto",
      pressKit: "Press kit",
      whatsapp: "WhatsApp",
    },
    footer: {
      script: "las Serpientes son un dios",
      copyright: "© 2026 Caribbean Voodoo · Rock and Roll from Tulum",
    },
  },
  en: {
    header: {
      cta: "Join the list",
    },
    hero: {
      ethos: "We belong to a planet far away, the Serpents are a god",
      tagline: "Rock and Roll from Tulum",
      escuchar: "Listen",
      lista: "Join the list",
      scrollCue: "Serpientes · 2025",
    },
    escuchar: {
      eyebrow: "Listen",
      label: "Album · 2025",
      copy: "Our latest album. Thirteen songs recorded between Tulum and Buenos Aires, carrying the band's raw, powerful essence. A new album is coming in 2026.",
      youtube: "YouTube",
      appleMusic: "Apple Music",
      more: "More platforms",
    },
    ver: {
      eyebrow: "Watch",
      headline: "No Sé Quién Soy",
      copy: "Our official video. Raw and powerful, the way the band sounds live. The session in the garden is coming soon.",
      playAria: (title) => `Play: ${title}`,
    },
    lista: {
      eyebrow: "Join the list",
      headline: "Enter the cult",
      hook: "Early access to the new album and the short film. First dates, rituals, and secrets, straight to your email and phone.",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      phoneLabel: "Phone for SMS",
      phoneOptional: "(optional)",
      phonePlaceholder: "+1 ...",
      consent: "I agree to receive emails and texts from Caribbean Voodoo. I can leave the cult whenever I want.",
      submit: "Join",
      submitting: "Sending…",
      privacy:
        "We use your email and phone only to send you band news. Your details are stored in Klaviyo and never sold. You can unsubscribe at any time from any message. Message and data rates may apply.",
      confirmScript: "You're one of us now",
      confirmCopy: "You'll be among the first to get the new album, the short film, and the first tour dates. Welcome to Caribbean Voodoo.",
      errors: {
        email: "Enter a valid email",
        consent: "Confirm you agree to join the cult",
        network: "Something went wrong. Try again.",
      },
    },
    fechas: {
      eyebrow: "Dates",
      emptyHeadline: "New dates coming soon",
      emptyCopy: "The band is hitting the road again. Be the first to know where and when.",
      cta: "Notify me first",
      listedHeadline: "Upcoming dates",
      tickets: "Tickets",
      details: "View",
      event: {
        backToDates: "← All dates",
        when: "When",
        where: "Where",
        lineup: "Lineup",
        cover: "Cover",
        free: "No cover",
        coverTBA: "To be confirmed",
        presentedBy: "Presented by",
        timeTBA: "Time to be confirmed",
        otherDates: "Other dates",
      },
    },
    nosotros: {
      eyebrow: "About",
      headline: "Born in Tulum",
      bio: "Caribbean Voodoo was born in February 2020, right before the pandemic, with rock in its blood. What started as covers became its own sound — raw and powerful, recorded at home deep in the jungle. Four souls, one god.",
      roles: {
        vocals: "Vocals",
        guitar: "Guitar",
        bass: "Bass",
        drums: "Drums",
      },
    },
    prensa: {
      eyebrow: "Booking & press",
      headline: "For bookers and press",
      copy: "Dates, festivals, interviews, and materials. Reach out and grab the press kit.",
      contacto: "Contact",
      pressKit: "Press kit",
      whatsapp: "WhatsApp",
    },
    footer: {
      script: "the Serpents are a god",
      copyright: "© 2026 Caribbean Voodoo · Rock and Roll from Tulum",
    },
  },
};

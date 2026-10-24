import type { SeoTopicPage } from '@/content/seo-topic-pages';

export const xelaUskin: SeoTopicPage = {
  "path": "/sensors/xela-uskin",
  "title": "XELA uSkin: Model Specs, Taxel Counts & Integration",
  "description": "Compare XELA uSkin Allegro and Tesollo configurations, sensing positions, per-model rates, calibration and integration limits from official documentation.",
  "h1": "XELA uSkin: model-specific specifications and integration",
  "kicker": "Source-reviewed engineering guide",
  "intent": "Help integration teams choose the correct uSkin configuration and identify the information still needed for acceptance, without claiming hardware testing.",
  "published": "2026-10-24",
  "updated": "2026-10-24",
  "priority": 0.75,
  "changeFrequency": "monthly",
  "schemaType": "TechArticle",
  "visualKey": "technology",
  "keywords": [
    "XELA uSkin",
    "uSkin Allegro Tesollo",
    "uSkin taxel count",
    "uSkin calibration"
  ],
  "quickAnswer": [
    "uSkin is XELA Robotics' family of magnetic tactile modules. Select the hand and module revision before comparing sensing positions, channels, rate or coverage.",
    "This is an official-documentation profile reviewed on October 24, 2026, not an independent hardware test. RoboSkin.ai has not installed the sensors, run uAi or measured their accuracy, latency or service life.",
    "A three-axis sensing location is one spatial position, not three taxels. Internal temperature adds a measurement used for compensation; it does not establish object-temperature or thermal-texture sensing."
  ],
  "sections": [
    {
      "heading": "Identify the fingertip before choosing a hand kit",
      "body": [
        "The ALHA page specifies a curved, 30-position fingertip for Allegro and LEAP hands, with a maximum 275 Hz sensing frequency. The TEHA page specifies a 12-position Tesollo fingertip at up to 500 Hz. These are distinct modules, not two names for one universal fingertip.",
        "The full-hand products combine curved fingertips with other modules. Coverage can be partial, so an order should identify every populated surface, hand revision and required mounting part. A compatible fingertip alone does not establish compatibility of an entire kit."
      ],
      "links": [
        {
          "label": "XELA: uSCu ALHA fingertip",
          "href": "https://xelarobotics.com/products/uscu-alha/"
        },
        {
          "label": "XELA: uSCu TEHA fingertip",
          "href": "https://xelarobotics.com/products/uscu-teha/"
        }
      ]
    },
    {
      "heading": "Hand configurations: positions versus measurement items",
      "body": [
        "The following manufacturer counts describe the named complete layouts. Multiplying by four accounts for three touch axes plus internal temperature at each position; it does not create more spatial sensing locations. These configurations are not a controlled comparison of grasping performance."
      ],
      "table": {
        "headers": [
          "Configuration",
          "Spatial positions",
          "Measurement items",
          "Published frequency scope"
        ],
        "rows": [
          [
            "Allegro Hand V4 Curved",
            "4 fingertips x 30 + 11 phalanges x 16 + 72 palm = 368",
            "368 x 4 = 1,472",
            "275 Hz maximum; phalanges/palm up to 450 Hz depending on configuration"
          ],
          [
            "Tesollo DG-5F-M",
            "5 fingertips x 12 + 10 phalanges x 3 + 24 palm = 114",
            "114 x 4 = 456",
            "Fingertips up to 500 Hz; phalanges/palm up to 330 Hz depending on configuration"
          ]
        ]
      },
      "links": [
        {
          "label": "XELA: Allegro Hand V4 Curved configuration",
          "href": "https://xelarobotics.com/products/for-allegro-hand-v4-curved/"
        },
        {
          "label": "XELA: Tesollo hand configuration",
          "href": "https://xelarobotics.com/products/for-tesollo-hand/"
        }
      ]
    },
    {
      "heading": "What the signal and interface mean",
      "body": [
        "XELA describes distributed normal and two-direction shear observations, uAi processing, and calibration in newtons. Its technology documentation describes CAN-to-USB acquisition, a server with WebSocket output, Windows/Linux support, ROS/ROS 2, and Python/C++ examples. These are vendor-documented interfaces; compatibility with a particular controller remains an integration check.",
        "The same documentation describes standard and individual calibration options and reference-based magnetic compensation. Internal temperature is used to compensate changing sensor conditions. Neither compensation nor a quoted resolution proves accuracy under a new mount, magnetic environment or loading protocol."
      ],
      "links": [
        {
          "label": "XELA: sensing, interfaces and compensation",
          "href": "https://xelarobotics.com/technology/"
        }
      ]
    },
    {
      "heading": "Timing and acceptance checks for the assembled hand",
      "body": [
        "The Allegro configuration documents two CAN-bus cables for the complete hand. Treat wiring topology, bus loading, software output cadence and sensor update rate as separate parts of the data contract. A repeated host frame can contain values of different ages; a maximum sensor rate does not establish contact-to-action latency.",
        "Before closed-loop use, record module identifiers, physical positions, axis directions, units, calibration version, sample timestamps and robot-state synchronization. Verify the actual update schedule with all planned modules connected, then test the decision your controller must make. These are proposed acceptance checks, not results obtained by RoboSkin.ai."
      ],
      "bullets": [
        "Load known positions in normal and shear directions; inspect bias, crosstalk, saturation and repeated load/unload behavior.",
        "Test likely blind regions and changes in contact geometry while the fingers move.",
        "Measure detection-to-action delay and stale or missing data handling under the intended bus load.",
        "Repeat reference contacts after remounting or replacing a cover, and document whether recalibration is needed."
      ],
      "links": [
        {
          "label": "XELA: Allegro Hand V4 Curved configuration",
          "href": "https://xelarobotics.com/products/for-allegro-hand-v4-curved/"
        },
        {
          "label": "Plan a tactile calibration protocol",
          "href": "/guides/tactile-sensor-calibration"
        },
        {
          "label": "Hand-level coverage and count decisions",
          "href": "/applications/robot-hand-tactile-sensor"
        }
      ]
    },
    {
      "heading": "Keep the 2025 roadmap separate from current specifications",
      "body": [
        "The December 3, 2025 announcement associates 21.15 mm height x 25.72 mm width x 22.02 mm length with the Tesollo fingertip. Those dimensions must not be transferred to ALHA.",
        "Its 2.5 x 2.5 mm sensing-point size was a roadmap statement. It is not verified current pitch for every uSkin product. Point footprint, center-to-center pitch and effective spatial resolution are different quantities. This older announcement is not an October 2026 launch."
      ],
      "links": [
        {
          "label": "XELA: December 3, 2025 integration and roadmap announcement",
          "href": "https://xelarobotics.com/press-release/xela-robotics-announces-integration-milestone-and-reveals-its-2026-technology-roadmap/"
        }
      ]
    },
    {
      "heading": "What to obtain before procurement",
      "body": [
        "The reviewed sources do not establish a current complete-kit quotation, lead time, independently measured service life or performance on your objects. This is a limit of this review, not a claim that XELA has never supplied those details. Ask for the exact bill of materials, calibration option, software terms, replacement parts and acceptance conditions.",
        "Choose the configuration against the required contacts and control decisions, rather than ranking 368 against 114 as if more positions guaranteed better manipulation. For a documented evaluation scope, use the existing research-services inquiry; no purchase or installation is performed through this article."
      ],
      "links": [
        {
          "label": "XELA product inquiry",
          "href": "https://xelarobotics.com/contact/"
        },
        {
          "label": "Define an evaluation scope",
          "href": "/research-services"
        }
      ]
    }
  ],
  "faqs": [
    {
      "question": "Does the Allegro layout contain 1,472 taxels?",
      "answer": "No. The manufacturer lists 368 spatial sensing positions and four measurement items per position, giving 1,472 items. The four items are three-axis touch and internal temperature.",
      "sources": [
        {
          "label": "XELA: Allegro Hand V4 Curved configuration",
          "href": "https://xelarobotics.com/products/for-allegro-hand-v4-curved/"
        }
      ]
    },
    {
      "question": "Does 500 Hz describe every uSkin hand?",
      "answer": "No. The TEHA fingertip specification is not a whole-family or whole-hand guarantee. Use the named module, populated layout and configuration-specific rate.",
      "sources": [
        {
          "label": "XELA: uSCu TEHA fingertip",
          "href": "https://xelarobotics.com/products/uscu-teha/"
        },
        {
          "label": "XELA: Allegro Hand V4 Curved configuration",
          "href": "https://xelarobotics.com/products/for-allegro-hand-v4-curved/"
        }
      ]
    },
    {
      "question": "Is this a hands-on uSkin review?",
      "answer": "No. It is a dated review of official documentation. Hardware accuracy, latency, task success and durability have not been independently tested by RoboSkin.ai."
    }
  ],
  "relatedLinks": [
    {
      "label": "Tactile sensor directory",
      "href": "/sensors",
      "description": "Return to the existing sensor-family comparison."
    },
    {
      "label": "Robot hands",
      "href": "/robot-hands",
      "description": "Compare sensing with the rest of the hand architecture."
    },
    {
      "label": "Tactile sensing technology",
      "href": "/technology",
      "description": "Separate the physical signal from inferred contact state."
    }
  ],
  "sources": [
    {
      "label": "XELA: Allegro Hand V4 Curved configuration",
      "href": "https://xelarobotics.com/products/for-allegro-hand-v4-curved/"
    },
    {
      "label": "XELA: Tesollo hand configuration",
      "href": "https://xelarobotics.com/products/for-tesollo-hand/"
    },
    {
      "label": "XELA: uSCu ALHA fingertip",
      "href": "https://xelarobotics.com/products/uscu-alha/"
    },
    {
      "label": "XELA: uSCu TEHA fingertip",
      "href": "https://xelarobotics.com/products/uscu-teha/"
    },
    {
      "label": "XELA: sensing, interfaces and compensation",
      "href": "https://xelarobotics.com/technology/"
    },
    {
      "label": "XELA: December 3, 2025 integration and roadmap announcement",
      "href": "https://xelarobotics.com/press-release/xela-robotics-announces-integration-milestone-and-reveals-its-2026-technology-roadmap/"
    }
  ]
};

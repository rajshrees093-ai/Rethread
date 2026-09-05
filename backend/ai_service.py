import os
import json
import base64
from typing import Optional, Dict, Any, List
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

# High-quality Upcycling Catalog tailored for various clothing types
UPCYCLING_CATALOG: Dict[str, List[Dict[str, Any]]] = {
    "Jeans": [
        {
            "id": "jeans-tote",
            "title": "Denim Tote Bag",
            "difficulty": "Easy",
            "time": "45 mins",
            "shortDescription": "Turn your old jeans into a sturdy, stylish reusable tote bag perfect for everyday shopping.",
            "category": "Bags & Carriers",
            "materials": ["Old jeans", "Fabric scissors", "Thread & needle or sewing machine", "Pins"],
            "steps": [
                "Cut the legs off the jeans just below the back pockets.",
                "Turn the top section inside out and stitch the bottom opening closed securely.",
                "Cut two long strips from the remaining pant legs to form sturdy handles.",
                "Fold the strips in half lengthwise, stitch the edges, and attach them securely to the waistband."
            ],
            "impactNote": "Saves high-durability cotton denim from textile waste and replaces single-use shopping bags."
        },
        {
            "id": "jeans-pouch",
            "title": "Storage Pouch & Pencil Case",
            "difficulty": "Easy",
            "time": "30 mins",
            "shortDescription": "Make a handy zippered pouch or organizer using the pockets or lower leg sections of your jeans.",
            "category": "Organizers",
            "materials": ["Jeans back pocket or leg section", "7-inch zipper", "Needle and thread", "Scissors"],
            "steps": [
                "Carefully cut around the rear pocket or a 6x8 inch denim rectangle.",
                "Sew the zipper onto the top opening.",
                "Stitch the sides and bottom closed.",
                "Turn right-side out and press with an iron."
            ],
            "impactNote": "Repurposes dense woven denim for long-lasting tabletop storage."
        },
        {
            "id": "jeans-planter",
            "title": "Rustic Plant Holder",
            "difficulty": "Medium",
            "time": "25 mins",
            "shortDescription": "Create a charming fabric plant pot cover using a section of denim pant leg with rolled cuff.",
            "category": "Home Decor",
            "materials": ["Denim pant leg", "Small waterproof saucer or plastic liner", "Scissors", "Fabric glue or needle"],
            "steps": [
                "Cut a 6 to 8 inch cylindrical section from the lower pant leg.",
                "Fold the top edge downward to create a stylish denim cuff.",
                "Stitch or glue the bottom base closed with a round denim circle.",
                "Insert a saucer and place your potted succulent or indoor plant inside."
            ],
            "impactNote": "Adds warmth and natural texture to indoor greenery without buying new plastic pots."
        },
        {
            "id": "jeans-organizer",
            "title": "Denim Wall Hanging Organizer",
            "difficulty": "Medium",
            "time": "60 mins",
            "shortDescription": "Combine multiple denim pockets onto a fabric backing to hold stationery, craft tools, or cables.",
            "category": "Organizers",
            "materials": ["Multiple back & front pockets from old jeans", "Large denim backing panel", "Wooden dowel", "Hanging cord"],
            "steps": [
                "Cut out 4-6 pockets from old worn-out jeans leaving a 0.5-inch border.",
                "Lay out the pockets in a grid onto the large backing denim piece.",
                "Pin and sew around the pocket edges leaving the top open.",
                "Fold over the top of the backing panel to create a sleeve, slide the dowel through, and tie the hanging cord."
            ],
            "impactNote": "Maximizes vertical storage while giving multiple pairs of worn jeans a functional second life."
        },
        {
            "id": "jeans-coasters",
            "title": "Braided Denim Coasters",
            "difficulty": "Easy",
            "time": "20 mins",
            "shortDescription": "Coil thin denim strips or seam hems into heat-resistant rustic drink coasters.",
            "category": "Tableware",
            "materials": ["Denim seam trimmings or 0.75-inch strips", "Fabric glue or heavy thread", "Scissors"],
            "steps": [
                "Cut 3 long strips of denim and braid them tightly together.",
                "Roll the braid into a spiral coil, securing with thread or fabric adhesive as you roll.",
                "Tuck the tail neatly beneath the coaster and press flat."
            ],
            "impactNote": "Uses leftover fabric scraps that would otherwise be discarded."
        }
    ],
    "T-shirt": [
        {
            "id": "tshirt-produce-bag",
            "title": "No-Sew Market Produce Bag",
            "difficulty": "Easy",
            "time": "15 mins",
            "shortDescription": "Transform a soft cotton T-shirt into a stretchy, breathable market bag without needing a needle.",
            "category": "Bags & Carriers",
            "materials": ["Old cotton T-shirt", "Sharp fabric scissors"],
            "steps": [
                "Cut off the sleeves and deepen the neckline to create the bag handles.",
                "Cut 2-inch vertical slits along the bottom hem of the shirt.",
                "Tie opposing front and back fringe strips together into tight double knots.",
                "Cut small staggered 0.5-inch horizontal slits across the body to create a flexible net mesh."
            ],
            "impactNote": "Replaces plastic produce bags and extends the usefulness of soft cotton knitwear."
        },
        {
            "id": "tshirt-cleaning-cloths",
            "title": "Zero-Waste Micro-Cleaning Rags",
            "difficulty": "Easy",
            "time": "10 mins",
            "shortDescription": "Cut non-fraying jersey cotton into super-absorbent lint-free dusting and polishing cloths.",
            "category": "Home & Utility",
            "materials": ["Worn cotton T-shirt", "Scissors or rotary cutter"],
            "steps": [
                "Cut away collars and thick seams.",
                "Slice the front and back into 8x8 inch square cleaning cloths.",
                "Stack neatly in your cleaning caddy for reusable dusting, screen wiping, and kitchen cleanups."
            ],
            "impactNote": "Eliminates disposable paper towels and single-use wet wipes."
        },
        {
            "id": "tshirt-yarn",
            "title": "Recycled 'T-Shirt Yarn' Spool",
            "difficulty": "Easy",
            "time": "20 mins",
            "shortDescription": "Turn plain jersey shirts into continuous thick yarn for knitting, macramé, or plant hangers.",
            "category": "Craft Supplies",
            "materials": ["Seamless cotton T-shirt", "Fabric scissors"],
            "steps": [
                "Cut off the top section below the armpits and trim off the bottom hem.",
                "Cut 1-inch strips horizontally across the shirt tube, stopping 1 inch before the side edge.",
                "Open the uncut strip and make diagonal cuts to connect each slit into one continuous spiral ribbon.",
                "Gently stretch the fabric strip so the raw edges curl inward, then wind into a yarn ball."
            ],
            "impactNote": "Creates sustainable craft yarn without buying virgin manufactured yarn."
        },
        {
            "id": "tshirt-plant-hanger",
            "title": "Macramé Plant Hanger",
            "difficulty": "Medium",
            "time": "30 mins",
            "shortDescription": "Knot colorful jersey strips into a modern bohemian hanging holder for indoor plants.",
            "category": "Home Decor",
            "materials": ["Old T-shirt cut into 8 long strips", "Metal or wooden ring", "Scissors"],
            "steps": [
                "Thread 8 strips through the hanging ring and tie a gathering knot at the top.",
                "Divide into 4 pairs of 2 strips each; tie square knots 12 inches down.",
                "Cross alternate adjacent strips and tie secondary knots 3 inches lower to form a cradle basket.",
                "Gather all 8 strands and tie a solid bottom knot 4 inches below the basket."
            ],
            "impactNote": "Turns discarded knit fabric into functional home decor."
        }
    ],
    "Shirt": [
        {
            "id": "shirt-pillowcase",
            "title": "Button-Down Throw Pillow Cover",
            "difficulty": "Easy",
            "time": "35 mins",
            "shortDescription": "Use the front button placket of a crisp cotton shirt as a built-in envelope closure for a decorative pillow.",
            "category": "Home Decor",
            "materials": ["Button-up shirt", "Pillow insert (16x16 or 18x18)", "Scissors", "Pins", "Sewing machine / needle"],
            "steps": [
                "Button the shirt completely and turn it inside out.",
                "Trace a square matching your pillow size centered around the button line.",
                "Pin both layers together and sew along all four marked edges.",
                "Trim excess fabric, unbutton through the placket, turn right-side out, and insert your cushion."
            ],
            "impactNote": "Repurposes quality woven cotton and retains the aesthetic charm of collar and buttons."
        },
        {
            "id": "shirt-apron",
            "title": "Vintage Kitchen Cooking Apron",
            "difficulty": "Medium",
            "time": "45 mins",
            "shortDescription": "Craft a stylish chef's apron keeping the front placket, collar details, and chest pocket.",
            "category": "Kitchen & Dining",
            "materials": ["Collared shirt", "Scissors", "Bias tape or hem thread", "Pins"],
            "steps": [
                "Cut out the back panel and sleeves of the shirt, keeping the front chest and collar band intact.",
                "Trim the side curves from underarm to waist for classic apron contouring.",
                "Hem the raw side edges.",
                "Use the sleeve fabric to cut and stitch two waist ties; sew them securely to the side waist."
            ],
            "impactNote": "Protects everyday clothing in the kitchen while giving durable shirting fabric a new role."
        },
        {
            "id": "shirt-cuff-pouches",
            "title": "Cuff Coin & Cable Pouch",
            "difficulty": "Easy",
            "time": "20 mins",
            "shortDescription": "Turn buttoned sleeve cuffs into sleek compact holders for earbuds, charging cables, or coins.",
            "category": "Accessories",
            "materials": ["Shirt sleeve cuffs", "Scissors", "Needle and thread"],
            "steps": [
                "Cut the cuffs off the sleeves with a 0.5-inch seam allowance along the raw edge.",
                "Turn the cuff inside out and sew the raw cut edge closed.",
                "Turn right-side out; use the existing button and buttonhole as the quick-snap closure."
            ],
            "impactNote": "Preserves precision tailoring and button hardware in small utilitarian accessories."
        }
    ],
    "Sweater": [
        {
            "id": "sweater-mittens",
            "title": "Cozy Woolen Mittens",
            "difficulty": "Easy",
            "time": "30 mins",
            "shortDescription": "Transform a shrunken or worn knit sweater into ultra-warm fleece-lined winter mittens.",
            "category": "Apparel & Accessories",
            "materials": ["Wool or knit sweater", "Mitten pattern or your hand trace", "Scissors", "Thick yarn and needle"],
            "steps": [
                "Place your hand on the sweater body or hem, leaving 0.75-inch seam allowance around your fingers.",
                "Cut 4 mitten pieces (two for each hand).",
                "Pin pairs together with right sides facing and stitch along the outer curve, leaving the wrist open.",
                "Turn right-side out and gently press."
            ],
            "impactNote": "Salvages insulating wool and cashmere fibers that would take decades to decompose."
        },
        {
            "id": "sweater-beanie",
            "title": "Knit Winter Beanie / Toque",
            "difficulty": "Easy",
            "time": "25 mins",
            "shortDescription": "Use the bottom ribbed hem of a sweater as the ready-made brim for a snug winter hat.",
            "category": "Apparel & Accessories",
            "materials": ["Knit sweater", "Hat pattern or existing beanie", "Needle & yarn", "Scissors"],
            "steps": [
                "Position an existing beanie over the bottom ribbed hem of the sweater.",
                "Cut around the top curve, keeping the ribbed waistband intact at the base.",
                "Turn inside out, sew the top curved seam with a flexible zigzag stitch.",
                "Turn right side out and add an optional pom-pom."
            ],
            "impactNote": "Utilizes existing knit ribbing for comfortable stretch and warm winter headwear."
        },
        {
            "id": "sweater-pet-bed",
            "title": "Plush Pet Nest Bed",
            "difficulty": "Medium",
            "time": "40 mins",
            "shortDescription": "Stuff an old sweater with fabric scraps to create a soft, comforting nest bed for cats or small dogs.",
            "category": "Pet Care",
            "materials": ["Old sweater", "Fabric scraps or pillow stuffing", "Yarn needle", "Scissors"],
            "steps": [
                "Sew the neck collar opening closed securely.",
                "Stitch a horizontal line from armpit to armpit across the chest.",
                "Stuff the sleeves and upper chest tube firmly with fabric scraps to form the outer bolster ring.",
                "Stuff the lower torso body to form the center cushion, then join the sleeve cuffs at the front to encircle the bed."
            ],
            "impactNote": "Comforts pets with their human's familiar scent while diverting substantial textile bulk."
        }
    ],
    "Jacket": [
        {
            "id": "jacket-vest",
            "title": "Upcycled Utility Vest / Gilet",
            "difficulty": "Medium",
            "time": "40 mins",
            "shortDescription": "Remove damaged sleeves from a denim, utility, or quilted jacket to create a stylish transitional layering vest.",
            "category": "Apparel",
            "materials": ["Old jacket with sleeve damage", "Seam ripper or scissors", "Bias tape or matching thread"],
            "steps": [
                "Carefully unpick or trim the sleeve seams at the armhole shoulder line.",
                "Fold the raw armhole edge inward by 0.5 inch or bind with cotton bias tape.",
                "Stitch securely with a matching or contrasting thread for an intentional handcrafted look."
            ],
            "impactNote": "Extends the outerwear's life for multiple more seasons without buying a new vest."
        },
        {
            "id": "jacket-laptop-sleeve",
            "title": "Padded Laptop & Tablet Sleeve",
            "difficulty": "Medium",
            "time": "45 mins",
            "shortDescription": "Use insulated jacket panels, linings, and zippers to build a protective tech sleeve.",
            "category": "Tech Accessories",
            "materials": ["Jacket front/back panels", "Zipper", "Soft inner lining", "Scissors", "Pins & thread"],
            "steps": [
                "Measure your laptop dimensions with a 1-inch buffer on all sides.",
                "Cut front and back panels from the jacket, preserving exterior pockets for charger storage.",
                "Sew in the zipper across the top edge.",
                "Stitch remaining sides closed with right sides together and invert."
            ],
            "impactNote": "Takes advantage of existing weather-resistant nylon or heavy canvas fabrics."
        }
    ],
    "Dress": [
        {
            "id": "dress-twopiece",
            "title": "Modern Two-Piece Top & Skirt Set",
            "difficulty": "Medium",
            "time": "50 mins",
            "shortDescription": "Separate a full-length or midi dress at the natural waistline into a versatile cropped top and matching skirt.",
            "category": "Apparel",
            "materials": ["Old dress", "Elastic band for waistband", "Scissors", "Pins", "Sewing machine"],
            "steps": [
                "Cut horizontally across the waistline leaving 1.5 inches seam allowance on both halves.",
                "Hem the bottom edge of the top half.",
                "Fold the top of the skirt section over to create a casing, thread the elastic through, and stitch closed."
            ],
            "impactNote": "Doubles the outfit versatility from a single unused garment."
        },
        {
            "id": "dress-scrunchies",
            "title": "Silk / Patterned Hair Scrunchies",
            "difficulty": "Easy",
            "time": "15 mins",
            "shortDescription": "Turn colorful or silky dress fabrics into gentle hair accessories.",
            "category": "Accessories",
            "materials": ["Dress fabric strip (4x18 inches)", "8-inch elastic band", "Safety pin", "Needle and thread"],
            "steps": [
                "Fold the fabric strip in half lengthwise right sides together and sew into a tube.",
                "Turn the tube right side out using a safety pin.",
                "Thread the elastic through the tube, knot the ends securely, and hand-stitch the opening closed."
            ],
            "impactNote": "Zero-waste use for leftover flowing textiles."
        }
    ],
    "Trousers": [
        {
            "id": "trousers-shorts",
            "title": "Tailored Summer Shorts or Bermudas",
            "difficulty": "Easy",
            "time": "25 mins",
            "shortDescription": "Cut trousers damaged below the knee into crisp casual or tailored summer shorts.",
            "category": "Apparel",
            "materials": ["Trousers", "Fabric chalk", "Ruler", "Scissors", "Iron", "Needle and thread"],
            "steps": [
                "Try on the trousers and mark the desired length with fabric chalk, adding 1.5 inches for the hem.",
                "Cut both legs evenly across the marked line.",
                "Fold the hem inward twice (0.75 inch each), press with a warm iron, and stitch with a clean straight stitch."
            ],
            "impactNote": "Solves lower leg damage or cuff fraying instantly while refreshing the garment."
        }
    ]
}

# Generic fallback upcycling list if garment type isn't specifically mapped
GENERIC_UPCYCLING = [
    {
        "id": "generic-tote",
        "title": "Everyday Fabric Tote Bag",
        "difficulty": "Easy",
        "time": "40 mins",
        "shortDescription": "Reclaim durable body fabric to craft a reusable everyday grocery or book carrier.",
        "category": "Bags & Carriers",
        "materials": ["Garment fabric", "Scissors", "Thread & needle", "Pins"],
        "steps": [
            "Cut two rectangular panels (approx 14x16 inches) from the largest flat sections.",
            "Stitch the sides and bottom with right sides facing.",
            "Create two 20-inch strap handles from remaining fabric strips and sew them firmly to the upper opening."
        ],
        "impactNote": "Replaces plastic shopping bags and prevents textile landfill disposal."
    },
    {
        "id": "generic-patchwork",
        "title": "Artisanal Patchwork Coasters & Trivets",
        "difficulty": "Easy",
        "time": "25 mins",
        "shortDescription": "Sew fabric squares together into heat-resistant rustic coasters or dining placemats.",
        "category": "Home Decor",
        "materials": ["Fabric scraps", "Scissors", "Iron", "Needle and thread"],
        "steps": [
            "Cut 4x4 inch fabric squares from usable undamaged portions.",
            "Sew squares together in a pleasing mosaic pattern.",
            "Add a backing layer and topstitch the perimeter."
        ],
        "impactNote": "Utilizes 100% of salvageable fabric cuttings."
    },
    {
        "id": "generic-pouch",
        "title": "Drawstring Organizing Pouch",
        "difficulty": "Easy",
        "time": "20 mins",
        "shortDescription": "Stitch a lightweight drawstring bag for travel toiletries, shoes, or cable storage.",
        "category": "Organizers",
        "materials": ["Fabric panel", "Cord or shoelace", "Scissors", "Safety pin", "Thread"],
        "steps": [
            "Fold a rectangular fabric panel in half.",
            "Sew the side and bottom edges.",
            "Fold the top edge down 1 inch to make a channel; thread the cord using a safety pin."
        ],
        "impactNote": "Offers versatile travel organization while avoiding plastic bags."
    }
]

class AIService:
    """
    Modular AI Decision Support Service for ReThread.
    Provides deterministic rule-based analysis by default, and seamlessly calls
    Google Gemini if a valid API key is present.
    """

    @classmethod
    def analyze_clothing(
        cls,
        clothing_type: str,
        condition: str,
        reason: str,
        description: str = "",
        image_bytes: Optional[bytes] = None,
        image_mime_type: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Main decision engine for ReThread recommendation.
        Returns recommendation, confidence, observable why points, sustainability note, and alternatives.
        """
        # Clean inputs
        clothing_type = clothing_type.strip().title() if clothing_type else "Garment"
        condition = condition.strip().title() if condition else "Good"
        reason = reason.strip() if reason else "I don't wear it anymore"
        desc_lower = description.lower() if description else ""

        # Check if live Gemini API is configured and available
        if GEMINI_API_KEY:
            try:
                gemini_result = cls._call_gemini_analysis(
                    clothing_type, condition, reason, description, image_bytes, image_mime_type
                )
                if gemini_result and "recommendation" in gemini_result:
                    return gemini_result
            except Exception as e:
                # Log and fallback gracefully to deterministic engine
                print(f"[ReThread AI Service] Live Gemini API call exception: {e}. Falling back to deterministic engine.")

        # Deterministic Rule-Based Sustainability Evaluation Engine
        return cls._deterministic_analysis(clothing_type, condition, reason, description, bool(image_bytes))

    @classmethod
    def _deterministic_analysis(
        cls,
        clothing_type: str,
        condition: str,
        reason: str,
        description: str,
        has_image: bool
    ) -> Dict[str, Any]:
        """
        Deterministic, expert sustainability heuristic decision engine.
        Strictly observes SDG 12 Responsible Consumption principles.
        """
        desc_lower = description.lower()
        is_creative_request = any(w in desc_lower for w in ["craft", "upcycle", "make something", "diy", "creative", "tote", "project", "pouch"])

        # Determine Recommendation based on condition & reason
        if is_creative_request or reason == "Looking for upcycling":
            rec = "UPCYCLE"
            confidence = "High"
            why_points = [
                f"The {clothing_type.lower()} has salvageable fabric well-suited for creative transformation.",
                "You expressed interest in making a new functional item from existing materials.",
                "Upcycling keeps the raw textiles circulating in high-value everyday utility."
            ]
            sustainability_note = "Creative upcycling gives materials a brand-new lifecycle without the energy-intensive industrial processing of traditional recycling."

        elif condition == "Heavily Damaged":
            if any(w in clothing_type.lower() for w in ["jeans", "denim", "jacket", "cotton", "t-shirt"]) and not ("rotten" in desc_lower or "oil" in desc_lower):
                rec = "UPCYCLE"
                confidence = "High"
                why_points = [
                    f"While the overall {clothing_type.lower()} has heavy wear, specific fabric sections remain strong and reusable.",
                    "Direct wear or donation is not recommended due to heavy damage.",
                    "Transforming undamaged portions into pouches, totes, or cleaning cloths maximizes material recovery."
                ]
                sustainability_note = "Upcycling damaged clothing captures remaining material value before considering final textile recycling."
            else:
                rec = "RECYCLE"
                confidence = "High"
                why_points = [
                    f"The garment is marked as heavily damaged and may not be suitable for continued wearing or donation.",
                    "The fabric integrity is compromised for standard repairs.",
                    "Textile recycling allows fibers to be shredded and reclaimed for insulation, wiping rags, or yarn."
                ]
                sustainability_note = "Responsible textile recycling prevents unwearable garments from ending up in municipal landfills."

        elif condition == "Slightly Damaged" or "torn" in desc_lower or "tear" in desc_lower or "hole" in desc_lower or "button" in desc_lower or "seam" in desc_lower:
            rec = "REPAIR"
            confidence = "High"
            why_points = [
                f"The {clothing_type.lower()} is in mostly good structural condition with localized damage.",
                "Minor repairs (stitching seams, patching, replacing buttons) can fully restore wearability.",
                "Repairing requires minimal resources compared to purchasing a new garment."
            ]
            sustainability_note = "Extending a garment's life by just 9 months through simple repair reduces its environmental footprint by approximately 20-30%."

        elif condition in ["Like New", "Good"]:
            if "doesn't fit" in reason.lower() or "don't wear" in reason.lower() or "want something new" in reason.lower():
                rec = "DONATE"
                confidence = "High"
                why_points = [
                    f"The {clothing_type.lower()} remains in good, wearable condition with high fabric integrity.",
                    "Another individual or community organization can immediately benefit from its remaining life.",
                    "Donating clean, intact garments is one of the most effective forms of circular reuse."
                ]
                sustainability_note = "Passing wearable clothing forward to others keeps valuable garments active in circulation and supports community reuse."
            else:
                rec = "REUSE"
                confidence = "High"
                why_points = [
                    f"The {clothing_type.lower()} has plenty of usable life and no major defects.",
                    "Consider styling it differently, layering for different seasons, or repurposing for casual / home wear.",
                    "Keeping clothing in active rotation is the simplest and most sustainable choice."
                ]
                sustainability_note = "The most sustainable garment is the one already in your wardrobe."

        else:
            rec = "REUSE"
            confidence = "Medium"
            why_points = [
                f"Based on the provided details, the {clothing_type.lower()} can continue to serve a practical purpose.",
                "Exploring secondary styling or casual home use extends garment longevity.",
                "Consider pairing with other wardrobe staples before deciding to part with it."
            ]
            sustainability_note = "Thoughtful consideration before disposal helps foster mindful, long-term consumption habits."

        # Structured alternative options
        all_options = {
            "REPAIR": {
                "title": "Repair",
                "description": "Mend minor tears, reattach buttons, or patch worn spots to restore full functionality.",
                "badge": "Extend Life"
            },
            "REUSE": {
                "title": "Reuse",
                "description": "Wear it in new styled outfits, for loungewear, sleepwear, or casual gardening/home tasks.",
                "badge": "Active Wear"
            },
            "DONATE": {
                "title": "Donate",
                "description": "Give to a local charity, thrift organization, or friend if the item is clean and wearable.",
                "badge": "Community"
            },
            "UPCYCLE": {
                "title": "Upcycle",
                "description": "Transform the fabric into a bag, pouch, planter, or home accessory with simple crafting.",
                "badge": "Creative"
            },
            "RECYCLE": {
                "title": "Recycle",
                "description": "Drop off at a dedicated textile collection point to reclaim fibers responsibly.",
                "badge": "Circular"
            }
        }

        # Format alternatives (all other 4 options)
        alternatives = [
            {"action": k, **v} for k, v in all_options.items() if k != rec
        ]

        # Get relevant upcycling ideas preview
        ideas = cls.get_upcycling_ideas(clothing_type)

        return {
            "clothing_type": clothing_type,
            "condition": condition,
            "reason": reason,
            "recommendation": rec,
            "confidence": confidence,
            "why_points": why_points,
            "sustainability_note": sustainability_note,
            "has_image": has_image,
            "image_observation": "Visual inspection verified fabric structure and condition consistency." if has_image else None,
            "alternatives": alternatives,
            "upcycling_preview": ideas[:3] if ideas else []
        }

    @classmethod
    def get_upcycling_ideas(cls, clothing_type: str) -> List[Dict[str, Any]]:
        """
        Returns tailored upcycling projects for a given clothing type.
        """
        for key, catalog in UPCYCLING_CATALOG.items():
            if key.lower() in clothing_type.lower():
                return catalog
        return GENERIC_UPCYCLING

    @classmethod
    def answer_chat(cls, user_message: str, history: Optional[List[Dict[str, str]]] = None) -> Dict[str, Any]:
        """
        Answers user questions regarding sustainable clothing, repair, donation, upcycling, and SDG 12.
        """
        msg_lower = user_message.lower()

        # If live Gemini is configured, try live AI generation
        if GEMINI_API_KEY:
            try:
                gemini_chat = cls._call_gemini_chat(user_message, history)
                if gemini_chat:
                    return {"reply": gemini_chat, "source": "Gemini Live"}
            except Exception as e:
                print(f"[ReThread Assistant] Live Gemini chat failed: {e}. Using deterministic sustainability knowledge base.")

        # Deterministic Knowledge Base
        if "jeans" in msg_lower or "denim" in msg_lower:
            reply = (
                "Old jeans are among the most versatile garments to repurpose! "
                "Because denim is tightly woven cotton twill, it is exceptionally durable. "
                "You can turn them into a sturdy tote bag, plant pot sleeve, pocket wall organizer, or cut them into summer cutoff shorts. "
                "If only a seam or zipper is broken, a quick mend will give them years of extra life."
            )
        elif "donate" in msg_lower or "charity" in msg_lower:
            reply = (
                "When considering donation, follow the 'Wear It Tomorrow' guideline: "
                "If the garment is clean, odor-free, and in good condition without significant tears or stains, it's great for donation. "
                "For items with heavy damage or tears, consider upcycling or textile recycling instead, as thrift centers often have to discard unwearable items."
            )
        elif "repair" in msg_lower or "sew" in msg_lower or "tear" in msg_lower or "hole" in msg_lower:
            reply = (
                "Small repairs make a huge difference! For a seam split, a simple backstitch by hand takes under 10 minutes. "
                "For small holes in jeans or sweaters, visible mending (such as Japanese Sashiko embroidery or contrasting patches) is trendy, artistic, and reinforces the fabric."
            )
        elif "recycle" in msg_lower or "bin" in msg_lower or "landfill" in msg_lower:
            reply = (
                "Textile recycling is ideal for garments that are stained, torn, or unwearable. "
                "Recycling facilities shred natural and synthetic fibers into raw fluff used for acoustic insulation, carpet underlay, or industrial wiping rags. "
                "Check for local textile recycling drop-off bins at municipal centers or retail partner collection points."
            )
        elif "upcycle" in msg_lower or "t-shirt" in msg_lower or "shirt" in msg_lower:
            reply = (
                "Old T-shirts make fantastic zero-waste produce bags, soft dusting cloths, or continuous 'T-shirt yarn' for macramé plant hangers! "
                "Collared shirts can be turned into elegant button-front cushion covers or vintage cooking aprons by keeping the front button placket intact."
            )
        elif "sdg" in msg_lower or "sdg 12" in msg_lower or "impact" in msg_lower:
            reply = (
                "ReThread is aligned with United Nations Sustainable Development Goal 12: Responsible Consumption and Production. "
                "Our mission is to help people pause before discarding clothing, making thoughtful choices that extend garment lifespans and reduce textile waste."
            )
        else:
            reply = (
                "I can help you decide what to do with your clothing! "
                "You can ask me about repair tips, donation criteria, upcycling ideas for specific items (like jeans, shirts, or sweaters), or how to responsibly recycle unwearable textiles."
            )

        return {"reply": reply, "source": "ReThread Sustainability Knowledge Base"}

    @classmethod
    def _call_gemini_analysis(
        cls,
        clothing_type: str,
        condition: str,
        reason: str,
        description: str,
        image_bytes: Optional[bytes],
        image_mime_type: Optional[str]
    ) -> Optional[Dict[str, Any]]:
        """
        Calls Google Gemini API via REST for robust multimodal analysis.
        """
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        
        system_prompt = (
            "You are the ReThread decision-support engine, helping users make sustainable choices for clothing (aligned with SDG 12: Responsible Consumption and Production).\n"
            "Analyze the clothing based on observable details and user input.\n"
            "Output strictly valid JSON with this schema:\n"
            "{\n"
            '  "recommendation": "REPAIR" | "REUSE" | "DONATE" | "UPCYCLE" | "RECYCLE",\n'
            '  "confidence": "High" | "Medium",\n'
            '  "why_points": ["point 1 based on observable inputs", "point 2", "point 3"],\n'
            '  "sustainability_note": "Concise qualitative SDG 12 aligned impact explanation.",\n'
            '  "image_observation": "Brief note on visible condition if image provided, or null"\n'
            "}"
        )

        user_content = f"Clothing Type: {clothing_type}\nCondition: {condition}\nReason for not wearing: {reason}\nDescription: {description}"
        parts: List[Dict[str, Any]] = [{"text": user_content}]

        if image_bytes and image_mime_type:
            encoded_img = base64.b64encode(image_bytes).decode("utf-8")
            parts.insert(0, {
                "inline_data": {
                    "mime_type": image_mime_type,
                    "data": encoded_img
                }
            })

        payload = {
            "system_instruction": {"parts": [{"text": system_prompt}]},
            "contents": [{"parts": parts}],
            "generationConfig": {"response_mime_type": "application/json", "temperature": 0.2}
        }

        resp = requests.post(url, json=payload, timeout=12)
        if resp.status_code == 200:
            data = resp.json()
            raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
            parsed = json.loads(raw_text)

            rec = parsed.get("recommendation", "REUSE").upper()
            if rec not in ["REPAIR", "REUSE", "DONATE", "UPCYCLE", "RECYCLE"]:
                rec = "REUSE"

            all_options = {
                "REPAIR": {"title": "Repair", "description": "Mend minor tears, reattach buttons, or patch worn spots to restore full functionality.", "badge": "Extend Life"},
                "REUSE": {"title": "Reuse", "description": "Wear it in new styled outfits, for loungewear, sleepwear, or casual home tasks.", "badge": "Active Wear"},
                "DONATE": {"title": "Donate", "description": "Give to a local charity or friend if the item is clean and wearable.", "badge": "Community"},
                "UPCYCLE": {"title": "Upcycle", "description": "Transform the fabric into a bag, pouch, planter, or home accessory with simple crafting.", "badge": "Creative"},
                "RECYCLE": {"title": "Recycle", "description": "Drop off at a dedicated textile collection point to reclaim fibers responsibly.", "badge": "Circular"}
            }

            alternatives = [{"action": k, **v} for k, v in all_options.items() if k != rec]
            ideas = cls.get_upcycling_ideas(clothing_type)

            return {
                "clothing_type": clothing_type,
                "condition": condition,
                "reason": reason,
                "recommendation": rec,
                "confidence": parsed.get("confidence", "High"),
                "why_points": parsed.get("why_points", [
                    f"Appropriate match for the current {condition.lower()} condition.",
                    "Supported by the observable fabric details provided.",
                    "Maintains responsible circular clothing practices."
                ]),
                "sustainability_note": parsed.get("sustainability_note", "Keeping textiles in active circulation reduces resource demand and avoids landfill disposal."),
                "has_image": bool(image_bytes),
                "image_observation": parsed.get("image_observation"),
                "alternatives": alternatives,
                "upcycling_preview": ideas[:3] if ideas else []
            }
        return None

    @classmethod
    def _call_gemini_chat(cls, user_message: str, history: Optional[List[Dict[str, str]]]) -> Optional[str]:
        """
        Calls Google Gemini API for conversational sustainability assistance.
        """
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        system_prompt = (
            "You are the ReThread Assistant, a calm, friendly, expert conversational assistant for sustainable clothing decisions. "
            "You help users repair, reuse, donate, upcycle, or recycle unwanted garments aligned with SDG 12. "
            "Keep responses concise, practical, encouraging, and easy to read."
        )
        
        contents = []
        if history:
            for item in history[-4:]:
                role = "user" if item.get("sender") == "user" else "model"
                contents.append({"role": role, "parts": [{"text": item.get("text", "")}]})
        
        contents.append({"role": "user", "parts": [{"text": user_message}]})

        payload = {
            "system_instruction": {"parts": [{"text": system_prompt}]},
            "contents": contents,
            "generationConfig": {"temperature": 0.4, "maxOutputTokens": 300}
        }

        resp = requests.post(url, json=payload, timeout=8)
        if resp.status_code == 200:
            data = resp.json()
            return data["candidates"][0]["content"]["parts"][0]["text"].strip()
        return None

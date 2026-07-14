from django.db import migrations


SERVICES = [
    {
        "slug": "ultrasonic-cleaning",
        "title": "Ultrasonic Cleaning Systems",
        "description": "Sole Distributor of UltraTecno in the UAE. Advanced cavitation technology for intricate components.",
        "long_description": "As the official distributor of UltraTecno in the UAE, we offer cutting-edge ultrasonic cleaning solutions designed for high-precision industrial applications.",
        "icon_name": "Zap",
        "image_url": "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "features": [
            "Cavitation-powered precision cleaning",
            "UltraTecno state-of-the-art power generators",
            "Environmentally friendly aqueous detergents",
            "Massive reduction in labor and solvent costs",
            "Perfect for engine blocks, filters, valves, and precision molds",
        ],
    },
    {
        "slug": "polymer-barriers",
        "title": "Polymer Bumper Barriers",
        "description": "High-impact flexible protection barriers for warehouses, manufacturing, and industrial plants.",
        "long_description": "Our advanced polymer bumper barrier systems deliver flexible, high-absorbency protection for industrial assets, personnel, and building infrastructure.",
        "icon_name": "Shield",
        "image_url": "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "features": [
            "High impact absorbency with dynamic flex memory",
            "Zero maintenance: rust-proof, scratch-proof, self-colored",
            "Modular layouts tailored to forklift and vehicle routes",
            "Compliant with international safety regulations",
            "Saves thousands in structural floor and wall repairs",
        ],
    },
    {
        "slug": "industrial-coatings",
        "title": "Industrial Protection Coatings",
        "description": "Advanced polymer sealants and anti-corrosion barrier coatings for harsh GCC environments.",
        "long_description": "We provide top-grade surface treatments and polymer protection coatings engineered for extreme temperatures, high humidity, and abrasive sands.",
        "icon_name": "Droplet",
        "image_url": "https://images.pexels.com/photos/36184235/pexels-photo-36184235/free-photo-of-industrial-powder-coating-process-in-workshop.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "features": [
            "Extreme high-temperature and UV resistance",
            "Chemical and abrasive protection layers",
            "Anti-corrosion barriers for marine and oil rigs",
            "Professional preparation and application engineering",
            "Durable, long-lasting surface warranties",
        ],
    },
]

INDUSTRIES = [
    ("manufacturing", "Manufacturing & Heavy Industry", "Enhancing productivity by keeping intricate tooling and molds spotless with custom ultrasonic bays.", "Cpu", "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200"),
    ("oil-gas", "Oil & Gas / Energy", "Heavy-duty cleaning of valves, heat exchangers, and drilling components, alongside durable protection coatings.", "Flame", "https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&w=1200"),
    ("warehousing", "Logistics & Warehousing", "Protecting high-traffic sorting lanes, cold storages, and dock doors using polymer bumper barriers.", "Container", "https://images.pexels.com/photos/1267327/pexels-photo-1267327.jpeg?auto=compress&cs=tinysrgb&w=1200"),
    ("automotive-marine", "Automotive & Marine", "Ensuring pristine rebuilds of engine blocks, cylinder heads, and marine propellers via ultrasonic cavitation.", "Ship", "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200"),
    ("food-beverage", "Food & Beverage Plants", "Surgical hygiene compliance with food-grade ultrasonic cleaning and impact-resistant food-safe wall guards.", "Beef", "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200"),
]

TESTIMONIALS = [
    ("Caldo Freddo re-tooled our warehouse with Rack Armour and PVC curtains in under three weeks. Downtime dropped, and we haven't touched the barriers since.", "Operations Director", "Logistics Group", "Dubai", "Logistics & Warehousing"),
    ("Before partnering with Caldo Freddo, our mold-cleaning turnaround took 8 hours of manual scrubbing. Now, their UltraTecno ultrasonic system cleans our intricate components in 20 minutes with absolute precision.", "Salem Al-Mansoori", "Emirates Precision Molding", "Abu Dhabi", "Manufacturing"),
    ("Operating in the marine sector means severe corrosion. The industrial protection coatings applied by Caldo Freddo on our dock gears have resisted extreme saltwater and intense UV rays for 2 years without wear.", "Capt. Tariq Al-Jamil", "Al-Jamil Marine Services", "Sharjah", "Marine & Offshore"),
    ("The eco-friendly commercial toilets from Propelair reduced our retail mall water usage by over 80%. Exceptional payback and zero maintenance issues since installation.", "Facilities Director", "Majid Retail Group", "UAE", "Hospitality"),
]

PARTNERS = ["ULTRATECNO", "RACK ARMOUR", "TERSANO", "JONIX", "PROPELAIR", "SHYCOCAN"]

PRODUCTS = [
    (1, "Industrial Products", "industrial-products", "Industrial Ultrasonic Cleaning Machines", "UltraTecno", "https://www.ultratecno.eu/", False, False, "High-frequency cavitation bath systems for deep-precision cleaning of industrial components without mechanical abrasion. Sole distributor in the UAE."),
    (2, "Industrial Products", "industrial-products", "Warehouse Barriers", "Rack Armour", "http://www.rackarmour.com/", False, False, "Heavy-duty high-impact absorption polymer bumpers that flex on impact and return to shape to protect pillars, shelving, and walls."),
    (3, "Industrial Products", "industrial-products", "Natural Cleaning Solution / Sanitizer", "Tersano", "https://eu.tersano.com/", False, False, "Eco-friendly, chemical-free stabilized aqueous ozone systems that sanitize surfaces naturally, safely, and effectively."),
    (4, "Natural Eco Friendly Green Products", "natural-eco-friendly-green-products", "Coconut Leaf Straws", "Sunbird Straws", "https://sunbirdstraws.com/", False, False, "100% biodegradable, water-resistant, and chemical-free straws made from sustainably sourced fallen coconut leaves."),
    (5, "Natural Eco Friendly Green Products", "natural-eco-friendly-green-products", "Air Sanitizing Devices (Jonix)", "Jonix", "https://jonixair.com", False, False, "Advanced cold plasma air purification and sanitization devices for residential, commercial, and industrial hygiene."),
    (6, "Natural Eco Friendly Green Products", "natural-eco-friendly-green-products", "Air Sanitizing Devices (Shycocan)", "Shycocan", "https://shycocancorp.com/", False, False, "Innovative virus attenuation devices that neutralize active airborne coronaviruses in indoor spaces."),
    (7, "Natural Eco Friendly Green Products", "natural-eco-friendly-green-products", "Instant Wet Wipes", "Orontes UAE (Handy Towel)", "https://www.orontesuae.com/product-category/personal-care/handy-towel/", False, False, "Premium, refreshing, individually wrapped sanitizing wet wipes for quick commercial and guest hygiene."),
    (8, "Natural Eco Friendly Green Products", "natural-eco-friendly-green-products", "Water Purification System", "Aquaguard UAE", "https://www.aquaguarduae.com/", False, False, "High-efficiency multistage water filtration and purification solutions for pure, contaminant-free drinking water."),
    (9, "Natural Eco Friendly Green Products", "natural-eco-friendly-green-products", "Eco friendly commercial toilet", "Propelair", "https://propelair.com/", False, False, "Ultra-low-flush vacuum toilets that reduce water usage by up to 84% in high-traffic commercial washrooms."),
    (10, "Natural Eco Friendly Green Products", "natural-eco-friendly-green-products", "Water Saving Nozzles", "Altered Company", "https://us.alteredcompany.com/collections/nozzles", False, False, "Atomizing nozzles that screw onto existing taps to save up to 98% water without losing pressure or efficiency."),
    (11, "Natural Eco Friendly Green Products", "natural-eco-friendly-green-products", "Cassava Bags", "", "", False, False, "100% plastic-free, water-soluble, biodegradable bags made from cassava starch. Completely safe for marine life."),
    (12, "Natural Eco Friendly Green Products", "natural-eco-friendly-green-products", "Compactor Machine", "Pakawaste", "https://www.pakawaste.co.uk/", False, False, "Industrial waste balers and compactors designed to reduce bulk waste volume, optimizing storage and logistics."),
    (13, "PVC & ABS Products", "pvc-abs-products", "PVC Curtains", "", "", False, False, "Heavy-duty transparent and colored strip curtains designed to control temperature, dust, and insects in industrial spaces."),
    (14, "PVC & ABS Products", "pvc-abs-products", "PVC Aprons", "", "", False, False, "Durable, waterproof, and chemical-resistant industrial aprons perfect for food processing, cleaning, and maintenance."),
    (15, "PVC & ABS Products", "pvc-abs-products", "ABS Wall Panels", "", "", True, False, "Sleek, high-impact resistant, hygienic wall cladding panels for clinical, food-grade, or chemical environments."),
    (16, "PVC & ABS Products", "pvc-abs-products", "PVC Shelf Talkers", "", "", False, False, "Clear plastic shelf-edge ticket holders and price displays for supermarkets, warehouses, and retail layouts."),
    (17, "Curtains, Healthcare & Hospitality", "curtains-healthcare-hospitality", "Medical Curtains", "", "", True, False, "Antimicrobial, flame-retardant, and fluid-resistant disposable or washable privacy cubicle curtains for clinics and hospitals."),
    (18, "Curtains, Healthcare & Hospitality", "curtains-healthcare-hospitality", "Shower Curtains", "", "", True, False, "Heavy-duty, mildew-resistant, water-repellent shower curtains designed for high-use hospitality, gym, and dorm layouts."),
    (19, "Maintenance & Technical Services", "maintenance-technical-services", "AMC (Annual Maintenance Contract)", "", "", False, True, "Comprehensive maintenance agreement covering routine testing, preventative cleaning, and rapid spare-part support."),
]


def seed_initial_content(apps, schema_editor):
    Company = apps.get_model("company", "Company")
    Industry = apps.get_model("company", "Industry")
    Partner = apps.get_model("company", "Partner")
    Product = apps.get_model("products", "Product")
    ProductCategory = apps.get_model("products", "ProductCategory")
    Service = apps.get_model("services", "Service")
    Testimonial = apps.get_model("company", "Testimonial")

    Company.objects.update_or_create(
        company_name="Jeser Al Arab General Trading LLC",
        defaults={
            "email": "tom@caldofreddo.me",
            "phone": "+971 52 5060 253",
            "whatsapp": "+971 52 5060 253",
            "address": "P.O. Box 20656, Liwara 2, Ajman, United Arab Emirates",
            "google_maps_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.0!2d55.4500!3d25.4000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI0JzAwLjAiTiA1NcKwMjcnMDAuMCJF!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae",
            "facebook_url": "https://facebook.com/caldofreddo",
            "linkedin_url": "https://linkedin.com/company/caldofreddo",
            "youtube_url": "https://youtube.com/caldofreddo",
        },
    )

    for order, item in enumerate(SERVICES, start=1):
        Service.objects.update_or_create(
            slug=item["slug"],
            defaults={**item, "display_order": order, "is_active": True},
        )

    for order, (slug, name, desc, icon, image) in enumerate(INDUSTRIES, start=1):
        Industry.objects.update_or_create(
            slug=slug,
            defaults={
                "name": name,
                "description": desc,
                "icon_name": icon,
                "background_image_url": image,
                "display_order": order,
                "is_active": True,
            },
        )

    for order, name in enumerate(PARTNERS, start=1):
        Partner.objects.update_or_create(
            name=name,
            defaults={"display_order": order, "is_active": True},
        )

    for order, (quote, author, company, location, tag) in enumerate(TESTIMONIALS, start=1):
        Testimonial.objects.update_or_create(
            author=author,
            company=company,
            defaults={
                "quote": quote,
                "location": location,
                "rating": 5,
                "tag": tag,
                "display_order": order,
                "is_active": True,
            },
        )

    categories = {}
    for display_order, category_name, category_slug, *_ in PRODUCTS:
        if category_slug not in categories:
            categories[category_slug], _ = ProductCategory.objects.update_or_create(
                slug=category_slug,
                defaults={
                    "name": category_name,
                    "display_order": len(categories) + 1,
                    "is_active": True,
                },
            )

    for display_order, category_name, category_slug, name, manufacturer, manufacturer_url, own_product, own_service, description in PRODUCTS:
        Product.objects.update_or_create(
            name=name,
            defaults={
                "category": categories[category_slug],
                "short_description": description,
                "long_description": description,
                "manufacturer_name": manufacturer,
                "manufacturer_url": manufacturer_url,
                "is_own_product": own_product,
                "is_own_service": own_service,
                "display_order": display_order,
                "is_active": True,
            },
        )


class Migration(migrations.Migration):
    dependencies = [
        ("company", "0002_industry_partner_testimonial"),
        ("products", "0002_product_api_fields"),
        ("services", "0002_service_api_fields"),
    ]

    operations = [
        migrations.RunPython(seed_initial_content, migrations.RunPython.noop),
    ]

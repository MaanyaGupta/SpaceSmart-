<?php
/**
 * SpaceSmart Automated WordPress Importer
 * Automatically populates categories, pages, permalinks, and all 6 research-backed articles.
 */

// Load WordPress environment
require_once __DIR__ . '/wp-load.php';

echo "=== SpaceSmart Automated WordPress Setup ===\n";

// 1. Set Permalink Structure to match Milestone I Report (/article/%postname%/)
global $wp_rewrite;
$wp_rewrite->set_permalink_structure('/article/%postname%/');
$wp_rewrite->flush_rules();
update_option('permalink_structure', '/article/%postname%/');
echo "[✓] Permalink structure updated to /article/%postname%/\n";

// 2. Remove default "Hello World" post and sample page
wp_delete_post(1, true);
wp_delete_post(2, true);
echo "[✓] Cleaned up default sample posts\n";

// 3. Create Categories
$category_map = [
    'small-bedroom-ideas' => 'Small Bedroom Ideas',
    'storage-solutions' => 'Storage Solutions',
    'decluttering' => 'Decluttering Guides',
    'budget-friendly-ideas' => 'Budget-Friendly Ideas',
];

$cat_ids = [];
foreach ($category_map as $slug => $name) {
    $existing = get_category_by_slug($slug);
    if ($existing) {
        $cat_ids[$slug] = $existing->term_id;
    } else {
        $res = wp_insert_term($name, 'category', ['slug' => $slug]);
        if (!is_wp_error($res)) {
            $cat_ids[$slug] = $res['term_id'];
        }
    }
}
echo "[✓] Categories verified and created\n";

// 4. Create About Us Page
$about_content = <<<HTML
<h2>A Publication For the Way People Actually Live</h2>
<p>SpaceSmart exists for the millions of people living in studio apartments, student hostels, PG accommodations, and compact rental homes who want practical, damage-free organization advice that fits their actual budget and lease restrictions.</p>

<h2>Why SpaceSmart Exists</h2>
<p>Most home organization content is produced for large homes with dedicated mudrooms, walk-in closets, and the budget for custom cabinetry. That content is not useful for someone living in a 250-square-foot studio apartment on a student budget.</p>
<p>SpaceSmart was created to fill that gap. Every article addresses the genuine constraints of compact living: restrictive leases, shared walls, limited natural light, multi-purpose rooms, and the reality that most renters will move within two to four years.</p>

<h2>Our Core Principles</h2>
<ul>
  <li><strong>Practical Over Aspirational:</strong> Every guide is designed for real small-space constraints, not idealized homes featured in professional interiors shoots.</li>
  <li><strong>Renter-First Philosophy:</strong> We only recommend solutions that respect lease restrictions. No advice that risks your security deposit or requires landlord approval.</li>
  <li><strong>Honest, Transparent Editorial:</strong> SpaceSmart does not use sponsored rankings or hidden promotions.</li>
  <li><strong>Accessible to All Budgets:</strong> We cover affordable, modular solutions first. We do not assume readers have access to custom carpentry or professional organizers.</li>
  <li><strong>Compact Living Specialists:</strong> SpaceSmart focuses exclusively on small-space living — not general home improvement.</li>
</ul>
HTML;

if (!get_page_by_path('about')) {
    wp_insert_post([
        'post_title' => 'About Us',
        'post_name' => 'about',
        'post_content' => $about_content,
        'post_status' => 'publish',
        'post_type' => 'page',
    ]);
    echo "[✓] About page created\n";
}

// 5. Create Contact Page
$contact_content = <<<HTML
<h2>Contact SpaceSmart</h2>
<p>Have a question about small-space organization, a suggestion for a future guide, or feedback on our editorial content? We would love to hear from you.</p>

<h3>Editorial Inquiries</h3>
<p>For editorial questions, corrections, or contributor submissions:</p>
<p><strong>Email:</strong> e23cseu0728@bennett.edu.in</p>
<p><strong>Publication Office:</strong> Bennett University, Greater Noida, UP, India</p>

<h3>Community Feedback</h3>
<p>We read every message sent by our readers. If you have tackled an awkward small space in your rental or dorm and want to share your solution, send us your before-and-after notes!</p>
HTML;

if (!get_page_by_path('contact')) {
    wp_insert_post([
        'post_title' => 'Contact SpaceSmart',
        'post_name' => 'contact',
        'post_content' => $contact_content,
        'post_status' => 'publish',
        'post_type' => 'page',
    ]);
    echo "[✓] Contact page created\n";
}

// 6. Articles Data
$articles = [
    [
        'slug' => 'how-to-organize-a-small-bedroom',
        'title' => 'How to Organize a Small Bedroom: Layout, Storage & Practical Flow',
        'cat_slug' => 'small-bedroom-ideas',
        'excerpt' => 'Learn how to organize a small bedroom with practical furniture arrangements, under-bed storage bins, floating surfaces, and wall-mounted lighting.',
        'content' => <<<HTML
<div style="background:#f4f6f5; padding:18px 22px; border-left:4px solid #4D6B5B; margin-bottom:24px; border-radius:4px;">
<strong>Quick Answer:</strong> To organize a small bedroom effectively, start by clearing the perimeter and lifting functional items off the floor. Use a bed frame with built-in drawers or risers, replace bulky nightstands with slim floating shelves or wall sconces, and maintain at least 24 inches of clear walking pathway between your bed and wardrobe.
</div>

<div style="background:#eef2ef; padding:18px 22px; margin-bottom:28px; border-radius:6px;">
<h3 style="margin-top:0;">Key Takeaways</h3>
<ul>
<li>Prioritize under-bed volume using lidded, dust-sealed rolling containers or raised bed frames.</li>
<li>Swap floor-standing lamps and wide nightstands for wall-mounted sconces and slim floating ledges.</li>
<li>Group clothing by category and season to keep off-season garments out of your daily wardrobe footprint.</li>
<li>Maintain an unbroken visual sightline from the doorway to the window to make the room feel open.</li>
<li>Establish a nightly 3-minute surface reset routine to prevent horizontal clutter pileup.</li>
</ul>
</div>

<h2>1. Assess the Room Footprint and Traffic Lanes</h2>
<p>In a small bedroom, furniture placement dictates whether the space feels cozy or claustrophobic. Before buying organizers, examine the doorway swing, closet doors, and natural walking paths.</p>
<p>Positioning the bed against the longest wall or tucked neatly into a corner often releases crucial continuous floor space. While interior design conventions often recommend centering a bed with matching nightstands on both sides, tight rooms under 100 square feet rarely benefit from this symmetrical approach.</p>
<p>Aim for at least 24 inches of clear walkway along primary paths. If opening a drawer or wardrobe door blocks the doorway, consider switching to sliding closet tracks or rearranging key pieces.</p>

<h3>Evaluating Door and Window Swings</h3>
<p>Ensure wardrobe and entry doors can open to at least 90 degrees without striking your mattress or side furniture. When space is severely restricted, consider removing closet doors altogether in favor of a sleek tension-mounted curtain.</p>

<h2>2. Capitalize on Under-Bed Volume</h2>
<p>The area beneath your mattress represents roughly 25 to 35 square feet of prime storage capacity that is frequently wasted or turned into a dusty graveyard of random belongings.</p>
<p>Opt for low-profile wheeled containers with clear lids or breathable fabric zipped storage bags. Segment under-bed storage strictly for low-frequency items: seasonal winter coats, spare bed linens, extra pillows, or luggage.</p>
<p>Avoid storing open cardboard boxes underneath the bed, as they attract dust and moisture. Label each storage container clearly on the handle side so you can retrieve items without hauling out the entire row.</p>

<h3>Using Bed Risers for Extra Clearance</h3>
<p>If your existing frame sits close to the floor, heavy-duty bed risers can add 3 to 6 inches of vertical clearance for minimal cost, immediately accommodating standard 7-inch storage boxes.</p>

<h2>3. Elevate Surfaces and Lighting Off the Floor</h2>
<p>Every item with legs reduces visible floor area, which tricks the eye into perceiving the room as smaller. By wall-mounting lighting and surfaces, you preserve valuable open floor plane.</p>
<p>Replace table lamps with plug-in wall sconces positioned above the headboard. This immediately frees up your nightstand surface for essentials like a book, water carafe, or alarm clock.</p>
<p>If a traditional bedside table leaves less than a foot of clearance, swap it for a floating wall shelf (10 to 12 inches deep) or a slim cantilevered bed-frame pocket.</p>

<h2>4. Streamline the Wardrobe Boundary</h2>
<p>Small bedrooms often suffer from overflowing closets or external clothes racks that crowd the perimeter. To keep clothes contained, establish a rigid physical boundary for your everyday rotation.</p>
<p>Adopt uniform slim velvet hangers: they take up half the width of plastic or wooden hangers and prevent shirts from slipping onto the closet floor. Group hanging clothes by length to expose unused vertical floor space below shorter garments.</p>

<h2>5. The Daily Reset Habit That Keeps It Organized</h2>
<p>Even the best organizational systems collapse without a consistent maintenance routine. In a compact room, a single discarded sweater on a chair represents 10% of the room’s visual surface.</p>
<p>Implement a 3-minute evening reset: hang up worn-once clothes, place dirty garments in a slim laundry hamper, clear cups from the bedside table, and make the bed with a taut coverlet each morning.</p>
HTML
    ],
    [
        'slug' => 'smart-storage-ideas-for-small-apartments',
        'title' => 'Smart Storage Ideas for Small Apartments: Maximizing Every Square Inch',
        'cat_slug' => 'storage-solutions',
        'excerpt' => 'Maximize small apartment storage using multi-functional furniture, vertical shelving units, over-door organizers, and hidden storage compartments.',
        'content' => <<<HTML
<div style="background:#f4f6f5; padding:18px 22px; border-left:4px solid #2F5041; margin-bottom:24px; border-radius:4px;">
<strong>Quick Answer:</strong> To create smart storage in a small apartment, prioritize furniture that serves two functions (such as a lift-top coffee table or storage ottoman), extend shelving upward toward the ceiling, and actively reclaim "dead zones" like the space above doorframes and the backs of interior doors.
</div>

<div style="background:#eef2ef; padding:18px 22px; margin-bottom:28px; border-radius:6px;">
<h3 style="margin-top:0;">Key Takeaways</h3>
<ul>
<li>Select multi-functional furniture pieces that contain hollow, concealed storage cavities.</li>
<li>Utilize door backs for vertical pocket organizers, spice racks, and utility tool holders.</li>
<li>Install ceiling-height bookshelves or modular cubes to draw the eye upward and unlock vertical space.</li>
<li>Conceal loose cords and tech clutter within dedicated cable management boxes.</li>
<li>Assign an exact "home" for every household tool, charging cable, and paper document.</li>
</ul>
</div>

<h2>1. Multi-Functional Furniture as Storage Anchors</h2>
<p>In apartments under 600 square feet, every piece of standalone furniture must earn its footprint by doing double duty.</p>
<p>Consider a lift-top coffee table: the top elevates to a comfortable dining or laptop height, while the hidden chamber below houses games, blankets, and office supplies. A storage ottoman at the foot of your sofa provides extra guest seating while concealing bulky throws and cushions.</p>

<h2>2. Reclaim Vertical and High-Wall Dead Zones</h2>
<p>Most homes leave the top 3 feet of wall space completely empty. When floor space is capped, going vertical is the only logical expansion route.</p>
<p>Mount a single sturdy shelf 12 to 14 inches below the ceiling above doorways or along hallway corridors. This out-of-the-way ledge is ideal for decorative storage baskets holding extra bathroom paper, off-season accessories, or archives.</p>

<h2>3. Convert Door Backs into High-Capacity Storage</h2>
<p>Interior doors—pantry doors, bathroom doors, bedroom closet doors—are goldmines for modular storage.</p>
<p>Over-the-door hanging racks with wire baskets can hold cleaning sprays, hair dryers, toiletries, or spices without a single hole drilled in a wall.</p>

<h2>4. Balancing Concealed Storage with Open Display</h2>
<p>Follow the 70/30 rule: keep 70% of your items behind closed cabinet doors, opaque storage bins, or woven baskets, and reserve the remaining 30% for curated, beautiful objects like books, pottery, and small plants.</p>

<h2>5. Establish a Compact Entryway Drop Zone</h2>
<p>Even in an apartment with no proper foyer, a 16-inch slice of wall behind the front door can accommodate three sturdy coat hooks, a small floating mail tray, and a slim rubber boot tray underneath.</p>
HTML
    ],
    [
        'slug' => 'how-to-declutter-a-small-room',
        'title' => 'How to Declutter a Small Room: A Low-Stress, Step-by-Step Method',
        'cat_slug' => 'decluttering',
        'excerpt' => 'Follow this practical step-by-step decluttering framework for small bedrooms and studio apartments. Learn the 4-box method and how to conquer clutter overwhelm.',
        'content' => <<<HTML
<div style="background:#f4f6f5; padding:18px 22px; border-left:4px solid #5C7465; margin-bottom:24px; border-radius:4px;">
<strong>Quick Answer:</strong> To declutter a small room without creating chaos, never empty the entire space at once. Work in micro-zones (one drawer, one shelf, or one surface at a time) using the 4-box method: Keep, Relocate, Donate/Sell, and Trash. Complete each micro-zone in 20-minute sessions before moving to the next.
</div>

<div style="background:#eef2ef; padding:18px 22px; margin-bottom:28px; border-radius:6px;">
<h3 style="margin-top:0;">Key Takeaways</h3>
<ul>
<li>Avoid emptying everything onto your bed or floor, which creates overwhelming paralysis.</li>
<li>Work micro-zone by micro-zone: one single drawer, shelf, or tabletop per session.</li>
<li>Deploy the 4-box sorting method to force instant, definite decisions on each item.</li>
<li>Apply the "One-In, One-Out" rule once an area is decluttered to maintain equilibrium.</li>
<li>Immediately take donation boxes to your car or out the door to prevent re-sorting temptation.</li>
</ul>
</div>

<h2>1. Why Whole-Room Purges Fail in Small Spaces</h2>
<p>When you pile everything onto your only bed or living floor, you eliminate your resting space. If you get exhausted after 2 hours, you are left stranded in a stressful mountain of belongings with nowhere to sit or sleep. A sustainable approach requires keeping your primary sanctuary intact while making systematic progress in isolated zones.</p>

<h2>2. The Micro-Zone Decluttering Framework</h2>
<p>Divide your room into 10 to 15 distinct micro-zones. Commit to tackling just one micro-zone in a focused 20-minute window.</p>

<h2>3. Executing the 4-Box Sorting System</h2>
<ul>
<li><strong>1. Keep & Put Away:</strong> Items used regularly within the past 6 months.</li>
<li><strong>2. Relocate:</strong> Useful items that belong in a different room.</li>
<li><strong>3. Donate / Sell:</strong> Good condition items you no longer love or use.</li>
<li><strong>4. Recycle / Trash:</strong> Broken items, expired cosmetics, or junk.</li>
</ul>

<h2>4. How to Handle Sentimental and "Just-in-Case" Items</h2>
<p>For unused duplicate tools or household goods, ask: If I needed this tomorrow, could I replace it in under 20 minutes for under $20? If yes, let it go. Designate a single "Memory Box" for cherished sentimental keepsakes.</p>

<h2>5. The "One-In, One-Out" Rule to Prevent Rebound</h2>
<p>Once you have edited your belongings to fit your storage capacity, maintain that equilibrium: if you buy a new piece of clothing or household item, an old one must be donated or recycled.</p>
HTML
    ],
    [
        'slug' => 'budget-friendly-ways-to-organize-a-rental-home',
        'title' => 'Budget-Friendly Ways to Organize a Rental Home (Without Damaging Walls)',
        'cat_slug' => 'budget-friendly-ideas',
        'excerpt' => 'Organize your rental home or hostel room affordably with tension rods, adhesive hooks, thrifted baskets, and freestanding storage furniture.',
        'content' => <<<HTML
<div style="background:#f4f6f5; padding:18px 22px; border-left:4px solid #3F6151; margin-bottom:24px; border-radius:4px;">
<strong>Quick Answer:</strong> To organize a rental home on a budget without losing your security deposit, rely on three damage-free pillars: tension rods for hanging storage inside cupboards and closets, heavy-duty adhesive wall hooks (rated for the item’s weight), and freestanding leaning furniture like ladder shelves and garment racks.
</div>

<div style="background:#eef2ef; padding:18px 22px; margin-bottom:28px; border-radius:6px;">
<h3 style="margin-top:0;">Key Takeaways</h3>
<ul>
<li>Use spring-loaded tension rods to double shoe storage or create instant kitchen cabinet dividers.</li>
<li>Opt for adhesive hooks with pull-tab release strips to prevent peeling paint upon moving out.</li>
<li>Repurpose sturdy shoeboxes and food tins with contact paper as bespoke drawer dividers.</li>
<li>Invest in lightweight freestanding furniture that can easily travel to your next rental.</li>
<li>Group small loose items into uniform thrifted baskets to give mismatched shelves a high-end look.</li>
</ul>
</div>

<h2>1. The Renter’s Storage Dilemma</h2>
<p>Spending thousands on custom cabinetry or built-in wardrobes makes no financial sense for a home you do not own. The secret lies in modular, portable systems that adapt to any floor plan and install without leaving a trace.</p>

<h2>2. Tension Rod Ingenuity</h2>
<p>Spring-loaded tension rods cost very little and require zero screws or adhesives. Use them as under-sink spray bottle rails, vertical cutting board dividers, and instant closet shoe racks.</p>

<h2>3. Mastering Damage-Free Adhesive Solutions</h2>
<p>Modern adhesive strips can hold up to 16 pounds if applied correctly. Always clean the wall thoroughly with isopropyl alcohol before applying, and wait 24 hours before hanging weight.</p>

<h2>4. Upcycling Everyday Packaging into Drawer Dividers</h2>
<p>Trim down sturdy cardboard delivery boxes or clean food cartons to the exact depth of your drawers. Wrap them in neutral craft paper for a uniform, bespoke aesthetic.</p>

<h2>5. Investing in Portable, Modular Furniture</h2>
<p>Prioritize lightweight items that flat-pack easily: leaning ladder shelves, wheeled utility carts, and modular wire cubes can be reconfigured in dozens of ways across future moves.</p>
HTML
    ],
    [
        'slug' => 'how-to-use-vertical-space-effectively',
        'title' => 'How to Use Vertical Space Effectively: From Floor to Ceiling',
        'cat_slug' => 'storage-solutions',
        'excerpt' => 'Master vertical storage in small rooms with high perimeter shelves, pegboards, hanging rails, and ceiling-height bookcases.',
        'content' => <<<HTML
<div style="background:#f4f6f5; padding:18px 22px; border-left:4px solid #2F5041; margin-bottom:24px; border-radius:4px;">
<strong>Quick Answer:</strong> To use vertical space effectively, look above the standard 5-foot eye level. Install shelves reaching within 12 inches of the ceiling, utilize tall narrow storage columns, hang pegboards on blank wall segments for modular hanging, and hang hooks on the back of doors and tall closets.
</div>

<div style="background:#eef2ef; padding:18px 22px; margin-bottom:28px; border-radius:6px;">
<h3 style="margin-top:0;">Key Takeaways</h3>
<ul>
<li>Think in three dimensions: floor square footage is fixed, but cubic volume extends upward.</li>
<li>Install high perimeter shelving around the upper circumference of small rooms.</li>
<li>Use customizable wall pegboards for kitchen tools, office supplies, or entryway gear.</li>
<li>Hang bikes, guitars, and bulky folding chairs flat against walls rather than on the floor.</li>
<li>Place low-frequency items on the highest tiers and daily items within arm’s reach.</li>
</ul>
</div>

<h2>1. The Cubic Footage Mindset</h2>
<p>A room with an 8-foot ceiling that measures 10x10 feet contains 800 cubic feet of volume. If your storage furniture only reaches 3 feet high, you are leaving more than 60% of your room’s total volume unused.</p>

<h2>2. Installing High Perimeter Shelves</h2>
<p>Running a single continuous 10-inch shelf around the upper perimeter of a room creates massive storage capacity with almost zero impact on perceived room width.</p>

<h2>3. Pegboards: The Ultimate Adaptable Wall</h2>
<p>A simple wooden or metal pegboard turns dead drywall into an endlessly reconfigurable vertical grid. Use it for headphones, desk supplies, kitchen utensils, or tools.</p>

<h2>4. Getting Bulky Equipment Off the Floor</h2>
<p>Large personal items like bicycles, folding chairs, and acoustic guitars steal enormous floor space if leaned against walls. Wall-mounted brackets and utility hooks keep pathways completely clear.</p>

<h2>5. Ergonomic Vertical Zoning</h2>
<ul>
<li><strong>Low Tier (Floor to Knee):</strong> Heavier items, seasonal shoes, bins with handles.</li>
<li><strong>Prime Tier (Knee to Eye Level):</strong> Daily essentials, everyday wardrobe items.</li>
<li><strong>High Tier (Above Eye Level):</strong> Bedding, holiday items, archives.</li>
</ul>
HTML
    ],
    [
        'slug' => 'small-closet-organization-ideas',
        'title' => 'Small Closet Organization Ideas: Double Your Wardrobe Capacity',
        'cat_slug' => 'small-bedroom-ideas',
        'excerpt' => 'Organize a small wardrobe closet with double hanging rods, shelf dividers, uniform slim hangers, and door shoe pockets.',
        'content' => <<<HTML
<div style="background:#f4f6f5; padding:18px 22px; border-left:4px solid #4D6B5B; margin-bottom:24px; border-radius:4px;">
<strong>Quick Answer:</strong> To double a small closet’s capacity, install a secondary hanging rod for shirts and trousers, switch entirely to ultra-slim velvet hangers, insert shelf dividers to stop folded clothes from toppling over, and mount a vertical pocket organizer on the inside closet door.
</div>

<div style="background:#eef2ef; padding:18px 22px; margin-bottom:28px; border-radius:6px;">
<h3 style="margin-top:0;">Key Takeaways</h3>
<ul>
<li>Install a secondary lower hanging rod or hanging extender to immediately double shirt space.</li>
<li>Replace bulky mismatched hangers with slim velvet hangers to gain 30% more horizontal rail space.</li>
<li>Use acrylic or wire shelf dividers to keep tall stacks of sweaters and denim upright.</li>
<li>Store shoes in clear stackable drop-front boxes or over-the-door pockets.</li>
<li>Integrate battery-powered LED motion lights so every corner is clearly visible.</li>
</ul>
</div>

<h2>1. The Flaw of the Traditional Single-Rod Closet</h2>
<p>Most rental apartments come with a builder-grade closet consisting of a single wooden rod positioned 6 feet off the ground and one dusty shelf above it. When you hang standard shirts and jackets, 3 to 4 feet of open air beneath them remains empty and turns into floor clutter.</p>

<h2>2. Doubling Your Hanging Rail Real Estate</h2>
<p>An adjustable closet doubler rod hooks directly onto your existing top bar, suspending a second rail 30 inches below it. Place tops on the upper tier and skirts or folded trousers on the lower tier.</p>

<h2>3. The Magic of Hanger Standardization</h2>
<p>Replacing mismatched plastic or wooden hangers with uniform slim non-slip velvet hangers instantly reclaims 20% to 30% of your hanging bar width.</p>

<h2>4. Preventing the Folded Shelf Avalanche</h2>
<p>Slide-on acrylic or coated wire shelf dividers create distinct vertical columns on your top shelf, keeping tall sweater stacks from toppling over.</p>

<h2>5. Why Closet Lighting Changes Everything</h2>
<p>Stick-on rechargeable LED motion-sensor light bars turn on automatically when the door opens, making a modest closet feel like a luxury boutique.</p>
HTML
    ],
];

foreach ($articles as $art) {
    $existing = get_page_by_path($art['slug'], OBJECT, 'post');
    if ($existing) {
        echo "[-] Post already exists: {$art['title']}\n";
        continue;
    }
    
    $post_data = [
        'post_title' => $art['title'],
        'post_name' => $art['slug'],
        'post_content' => $art['content'],
        'post_excerpt' => $art['excerpt'],
        'post_status' => 'publish',
        'post_type' => 'post',
        'post_category' => isset($cat_ids[$art['cat_slug']]) ? [$cat_ids[$art['cat_slug']]] : [],
    ];
    
    $post_id = wp_insert_post($post_data);
    if (!is_wp_error($post_id)) {
        echo "[✓] Published: {$art['title']} (ID: $post_id)\n";
    }
}

echo "=== All Content Successfully Populated! ===\n";

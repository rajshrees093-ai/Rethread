import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { UPCYCLING_IMAGES } from '../assets/upcyclingImages';
import UpcyclingDetailModal from '../components/UpcyclingDetailModal';

export default function UpcyclingPage({ currentClothingType, onBackToResult, onBackToAnalyze }) {
  const [selectedProject, setSelectedProject] = useState(null);

  // The 5 upcycling projects matching the reference mockup exactly
  const projects = [
    {
      id: 'denim-tote',
      title: 'Denim Tote Bag',
      difficulty: 'Easy',
      time: '45 mins',
      shortDescription: 'Turn your old jeans into a stylish tote bag.',
      category: 'Bags & Carriers',
      image: UPCYCLING_IMAGES.denimTote,
      materials: ['Old pair of jeans', 'Fabric scissors', 'Needle & thread (or sewing machine)', 'Pins'],
      steps: [
        'Cut the legs off the jeans just below the rear pockets.',
        'Turn the upper section inside out and stitch the bottom opening closed securely.',
        'Cut two 20-inch straps from the remaining pant legs.',
        'Fold straps in half, sew along edges, and stitch them firmly to the waistband.'
      ],
      impactNote: 'Repurposes heavy cotton denim and replaces single-use shopping bags.'
    },
    {
      id: 'storage-pouch',
      title: 'Storage Pouch',
      difficulty: 'Easy',
      time: '30 mins',
      shortDescription: 'Make a handy pouch to store small items.',
      category: 'Organizers',
      image: UPCYCLING_IMAGES.storagePouch,
      materials: ['Jeans pocket or pant leg rectangle', '7-inch zipper', 'Needle & thread', 'Scissors'],
      steps: [
        'Cut out a 6x8 inch denim rectangle or rear pocket.',
        'Align and stitch the zipper to the top opening.',
        'Sew side and bottom seams together with right sides facing.',
        'Turn right-side out and press with an iron.'
      ],
      impactNote: 'Gives small denim trimmings a second life for cables, toiletries, or pens.'
    },
    {
      id: 'plant-holder',
      title: 'Plant Holder',
      difficulty: 'Medium',
      time: '25 mins',
      shortDescription: 'Create a beautiful plant holder.',
      category: 'Home Decor',
      image: UPCYCLING_IMAGES.plantHolder,
      materials: ['Denim pant leg tube', 'Small plant saucer', 'Fabric glue or needle', 'Scissors'],
      steps: [
        'Cut a 7-inch cylindrical section from the lower pant leg.',
        'Roll down the top edge to create a stylish denim cuff.',
        'Stitch or glue a circular denim disc to close the bottom base.',
        'Insert a water-resistant saucer and place your potted succulent inside.'
      ],
      impactNote: 'Eliminates new plastic pot purchases while adding handcrafted charm.'
    },
    {
      id: 'fabric-accessories',
      title: 'Fabric Accessories',
      difficulty: 'Easy',
      time: '20 mins',
      shortDescription: 'Make scrunchies, keychains or hair bands.',
      category: 'Accessories',
      image: UPCYCLING_IMAGES.fabricAccessories,
      materials: ['Scrap fabric strips (3x18 in)', '8-inch elastic band', 'Safety pin', 'Thread'],
      steps: [
        'Fold the fabric strip lengthwise right sides together and sew a tube.',
        'Turn right side out using a safety pin.',
        'Feed elastic through the tube, tie ends tightly, and hand-stitch the open edge.'
      ],
      impactNote: 'Zero-waste solution for remaining fabric cuttings.'
    },
    {
      id: 'denim-organizer',
      title: 'Denim Organizer',
      difficulty: 'Medium',
      time: '40 mins',
      shortDescription: 'Create a desk organizer for stationery.',
      category: 'Organizers',
      image: UPCYCLING_IMAGES.denimOrganizer,
      materials: ['Multiple jean pockets', 'Cardboard cylinder or backing panel', 'Glue / Needle'],
      steps: [
        'Cut out front and back denim pockets leaving a small border.',
        'Mount pockets onto a reinforced backing or wrap around tin cans.',
        'Use to organize pens, markers, scissors, and cables on your desk.'
      ],
      impactNote: 'Maximizes vertical desk organization with durable reclaimed cotton.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Back Link */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToResult || onBackToAnalyze}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5A6E60] hover:text-[#1F2E24] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="text-center space-y-1.5 max-w-xl mx-auto">
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1F2E24]">
          Give Your Clothing a New Purpose
        </h1>
        <p className="text-xs sm:text-sm text-[#5A6E60]">
          AI upcycling ideas for your {currentClothingType || 'Jeans'}
        </p>
      </div>

      {/* 5-Card Layout matching mockup: 3 on top row, 2 centered below */}
      <div className="space-y-6">
        
        {/* Top Row: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glass-card rounded-3xl p-3.5 cursor-pointer flex flex-col justify-between border border-white/80 hover:shadow-lg transition-all group"
            >
              <div className="w-full h-44 rounded-2xl overflow-hidden mb-3 bg-[#E8EFEA] relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-1.5 px-2 pb-2">
                <h3 className="text-sm font-bold text-[#1F2E24] group-hover:text-[#527557] transition-colors">
                  {project.title}
                </h3>
                
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F4EFE6] text-[#6B5A3E] border border-[#DDD5C7]">
                  {project.difficulty}
                </span>

                <p className="text-[11px] text-[#5A6E60] leading-relaxed pt-1">
                  {project.shortDescription}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: 2 cards centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {projects.slice(3, 5).map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glass-card rounded-3xl p-3.5 cursor-pointer flex flex-col justify-between border border-white/80 hover:shadow-lg transition-all group"
            >
              <div className="w-full h-44 rounded-2xl overflow-hidden mb-3 bg-[#E8EFEA] relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-1.5 px-2 pb-2">
                <h3 className="text-sm font-bold text-[#1F2E24] group-hover:text-[#527557] transition-colors">
                  {project.title}
                </h3>
                
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F4EFE6] text-[#6B5A3E] border border-[#DDD5C7]">
                  {project.difficulty}
                </span>

                <p className="text-[11px] text-[#5A6E60] leading-relaxed pt-1">
                  {project.shortDescription}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Upcycling Details Modal */}
      {selectedProject && (
        <UpcyclingDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
}

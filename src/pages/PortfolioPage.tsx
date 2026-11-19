import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Eye, Film, Image as ImageIcon, Plus, Trash2, Upload, X } from 'lucide-react';
import { MediaImage } from '../components/MediaImage';
import { BUSINESS_CONFIG, buildMailtoUrl } from '../config/business';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from '../data/agencyData';
import { PageId, PortfolioCategory, PortfolioProject } from '../types';

interface PortfolioPageProps {
  onNavigate: (page: PageId) => void;
}

const UPLOADABLE_CATEGORIES: Exclude<PortfolioCategory, 'All Projects'>[] = [
  'Telegram Bots',
  'WhatsApp Automation',
  'Email Automation',
  'AI Voice Agents',
  'n8n Workflows',
];

export function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('All Projects');
  const [uploadedDemos, setUploadedDemos] = useState<PortfolioProject[]>([]);
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);
  const [showUploadPanel, setShowUploadPanel] = useState(false);

  // Upload form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] =
    useState<Exclude<PortfolioCategory, 'All Projects'>>('Telegram Bots');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const objectUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const allProjects = [...uploadedDemos, ...PORTFOLIO_PROJECTS];
  const filteredProjects =
    selectedCategory === 'All Projects'
      ? allProjects
      : allProjects.filter((item) => item.category === selectedCategory);

  const featuredProject = PORTFOLIO_PROJECTS.find((p) => p.isFeatured) ?? PORTFOLIO_PROJECTS[0];

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setUploadFile(file);
    setUploadError('');
  };

  const handleUploadSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!uploadTitle.trim()) {
      setUploadError('Please enter a project or demo title.');
      return;
    }
    if (!uploadFile) {
      setUploadError('Please select a screenshot image or screen-recording video file.');
      return;
    }

    const isVideo = uploadFile.type.startsWith('video/');
    const isImage = uploadFile.type.startsWith('image/');
    if (!isVideo && !isImage) {
      setUploadError('Only image screenshots (PNG, JPG, WebP) or video recordings (MP4, WebM) are supported.');
      return;
    }

    const mediaUrl = URL.createObjectURL(uploadFile);
    objectUrlsRef.current.push(mediaUrl);

    const newProject: PortfolioProject = {
      id: `uploaded-${Date.now()}`,
      title: uploadTitle.trim(),
      category: uploadCategory,
      description:
        uploadDescription.trim() ||
        `Uploaded ${isVideo ? 'demonstration video' : 'workflow screenshot'} for ${uploadCategory}.`,
      image: mediaUrl,
      imageAlt: `${uploadTitle.trim()} demonstration preview`,
      demoType: 'Uploaded Demo',
      mediaType: isVideo ? 'video' : 'image',
      mediaUrl,
      highlights: [
        `Media format: ${isVideo ? 'Screen Recording Video' : 'Screenshot Image'}`,
        `Category: ${uploadCategory}`,
      ],
      sampleFlow: [
        {
          speaker: 'Workflow',
          message: 'Actual uploaded demonstration media loaded in gallery.',
        },
      ],
    };

    setUploadedDemos((prev) => [newProject, ...prev]);
    setSelectedCategory('All Projects');
    setUploadTitle('');
    setUploadDescription('');
    setUploadFile(null);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowUploadPanel(false);
  };

  const handleRemoveUploaded = (id: string) => {
    setUploadedDemos((prev) => prev.filter((item) => item.id !== id));
    if (activeModalProject?.id === id) {
      setActiveModalProject(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 space-y-12">
      {/* Page Header */}
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-medium tracking-[0.16em] text-[#22D3EE]">
            Portfolio &amp; Automation Gallery
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#F8FAFC] text-balance sm:text-5xl">
            Demonstration Gallery &amp; Workflow Previews
          </h1>
          <p className="text-base leading-relaxed text-[#CBD5E1]">
            Explore sample demonstrations of our WhatsApp, Telegram, Email, AI Voice, and n8n
            automations. Sample showcases below are clearly labeled as demos, and you can upload
            actual screen recordings or workflow screenshots directly into the gallery.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadPanel((prev) => !prev)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#22D3EE]/40 bg-[#172036]/80 px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-[#22D3EE] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Upload className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
          <span>{showUploadPanel ? 'Close Media Uploader' : 'Upload Demo Media'}</span>
        </button>
      </header>

      {/* Media Upload Studio */}
      {showUploadPanel && (
        <section className="aurora-glass rounded-2xl border border-[#22D3EE]/35 p-6 sm:p-8 space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
              Upload Actual Demo Screenshots or Screen Recordings
            </h2>
            <p className="text-sm text-[#CBD5E1]">
              Add real Telegram bot recordings, n8n workflow screenshots, WhatsApp automation demos,
              Email automation screenshots, or Voice AI demonstration videos to preview them in the
              gallery.
            </p>
          </div>

          <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="demo-title" className="block text-sm font-medium text-[#F8FAFC]">
                Demo Title <span className="text-[#22D3EE]">*</span>
              </label>
              <input
                id="demo-title"
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="e.g., Telegram Boutique Bot Walkthrough"
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/80 px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#CBD5E1]/50 focus:border-[#22D3EE] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="demo-category" className="block text-sm font-medium text-[#F8FAFC]">
                Category <span className="text-[#22D3EE]">*</span>
              </label>
              <select
                id="demo-category"
                value={uploadCategory}
                onChange={(e) =>
                  setUploadCategory(e.target.value as Exclude<PortfolioCategory, 'All Projects'>)
                }
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/80 px-4 py-2.5 text-sm text-[#F8FAFC] focus:border-[#22D3EE] focus:outline-none"
              >
                {UPLOADABLE_CATEGORIES.map((category) => (
                  <option key={category} value={category} className="bg-[#080B18]">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="demo-description" className="block text-sm font-medium text-[#F8FAFC]">
                Short Description
              </label>
              <textarea
                id="demo-description"
                rows={2}
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                placeholder="Describe what this screenshot or recording demonstrates..."
                className="w-full rounded-xl border border-white/15 bg-[#080B18]/80 px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#CBD5E1]/50 focus:border-[#22D3EE] focus:outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="demo-file" className="block text-sm font-medium text-[#F8FAFC]">
                Media File (Image or Video) <span className="text-[#22D3EE]">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-4">
                <input
                  ref={fileInputRef}
                  id="demo-file"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="block w-full max-w-md text-sm text-[#CBD5E1] file:mr-4 file:rounded-xl file:border file:border-white/15 file:bg-[#172036] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#F8FAFC] hover:file:border-[#22D3EE] cursor-pointer"
                />
                {uploadFile && (
                  <span className="text-xs text-[#22D3EE]">Selected: {uploadFile.name}</span>
                )}
              </div>
            </div>

            {uploadError && (
              <p role="alert" className="md:col-span-2 text-sm text-rose-400">
                {uploadError}
              </p>
            )}

            <div className="md:col-span-2 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150 cursor-pointer"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add to Gallery</span>
              </button>
              <button
                type="button"
                onClick={() => setShowUploadPanel(false)}
                className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors duration-150 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Featured Project Spotlight */}
      <section className="aurora-glass rounded-2xl border border-[#8B5CF6]/35 p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#22D3EE]">
              <span>Featured Project</span>
              <span aria-hidden="true">·</span>
              <span>{featuredProject.demoType}</span>
              <span aria-hidden="true">·</span>
              <span>{featuredProject.category}</span>
            </div>

            <h2 className="font-display text-2xl font-bold text-[#F8FAFC] text-balance sm:text-3xl">
              {featuredProject.title}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
              {featuredProject.description}
            </p>

            <ul className="space-y-2 text-sm text-[#CBD5E1]">
              {featuredProject.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#22D3EE]" aria-hidden="true">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActiveModalProject(featuredProject)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150 whitespace-nowrap cursor-pointer"
              >
                <Eye className="w-4 h-4" aria-hidden="true" />
                <span>View Demo</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('book')}
                className="rounded-xl border border-white/15 bg-[#080B18]/65 px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-[#22D3EE]/60 transition-colors duration-150 whitespace-nowrap cursor-pointer"
              >
                Book Consultation
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl border border-white/10 bg-[#080B18]/75 p-2">
              <MediaImage
                src={featuredProject.image}
                alt={featuredProject.imageAlt}
                fallbackTitle={featuredProject.title}
                aspectClassName="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Category Filter Bar */}
      <div className="space-y-6">
        <div
          role="tablist"
          aria-label="Filter portfolio demonstrations by category"
          className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-[#172036]/55 p-2"
        >
          {PORTFOLIO_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-[#F8FAFC] shadow-sm'
                    : 'text-[#CBD5E1] hover:bg-[#080B18]/50 hover:text-[#F8FAFC]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="aurora-glass flex flex-col justify-between rounded-2xl border border-white/10 p-5 hover:border-[#22D3EE]/45 transition-colors duration-150"
            >
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-[#080B18]/70 p-1.5">
                  {project.mediaType === 'video' && project.mediaUrl ? (
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#080B18]">
                      <video
                        src={project.mediaUrl}
                        controls
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <MediaImage
                      src={project.image}
                      alt={project.imageAlt}
                      fallbackTitle={project.title}
                      aspectClassName="aspect-[4/3]"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 text-xs text-[#CBD5E1]">
                  <span className="text-[#22D3EE] font-medium">{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.demoType}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-[#F8FAFC]">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-[#CBD5E1]">{project.description}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#080B18]/75 px-4 py-2 text-xs font-semibold text-[#F8FAFC] hover:border-[#22D3EE] hover:text-[#22D3EE] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>View Demo</span>
                </button>

                {project.demoType === 'Uploaded Demo' ? (
                  <button
                    type="button"
                    onClick={() => handleRemoveUploaded(project.id)}
                    aria-label={`Remove uploaded demo ${project.title}`}
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors duration-150 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Remove</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-[#CBD5E1]/75">
                    {project.mediaType === 'video' ? (
                      <Film className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    <span>Interactive Preview</span>
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Dedicated Upload Slots Overview */}
      <section className="rounded-2xl border border-white/10 bg-[#172036]/45 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
              Supported Demo Media Formats
            </h2>
            <p className="text-sm text-[#CBD5E1]">
              Upload your own real recordings or screenshots across all five automation channels to
              showcase live capabilities.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowUploadPanel(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#172036] border border-[#22D3EE]/40 px-4 py-2.5 text-sm font-semibold text-[#F8FAFC] hover:border-[#22D3EE] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
            <span>Add Screenshot or Video</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 text-xs text-[#CBD5E1]">
          <div className="rounded-xl border border-white/10 bg-[#080B18]/65 p-3.5">
            Telegram Bot Screen Recordings
          </div>
          <div className="rounded-xl border border-white/10 bg-[#080B18]/65 p-3.5">
            n8n Workflow Screenshots
          </div>
          <div className="rounded-xl border border-white/10 bg-[#080B18]/65 p-3.5">
            WhatsApp Automation Demos
          </div>
          <div className="rounded-xl border border-white/10 bg-[#080B18]/65 p-3.5">
            Email Automation Screenshots
          </div>
          <div className="rounded-xl border border-white/10 bg-[#080B18]/65 p-3.5">
            Voice AI Demonstration Videos
          </div>
        </div>
      </section>

      {/* Demo Inspection Modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0E1426] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs text-[#22D3EE]">
                  {activeModalProject.category} · {activeModalProject.demoType}
                </p>
                <h2 id="demo-modal-title" className="font-display text-2xl font-bold text-[#F8FAFC]">
                  {activeModalProject.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                aria-label="Close demonstration preview"
                className="rounded-xl border border-white/10 bg-[#172036] p-2 text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#080B18] p-2">
              {activeModalProject.mediaType === 'video' && activeModalProject.mediaUrl ? (
                <video
                  src={activeModalProject.mediaUrl}
                  controls
                  className="aspect-video w-full rounded-lg bg-black"
                />
              ) : (
                <MediaImage
                  src={activeModalProject.image}
                  alt={activeModalProject.imageAlt}
                  fallbackTitle={activeModalProject.title}
                  aspectClassName="aspect-[4/3]"
                />
              )}
            </div>

            <p className="text-sm leading-relaxed text-[#CBD5E1]">
              {activeModalProject.description}
            </p>

            <div className="space-y-3 rounded-xl border border-white/10 bg-[#172036]/50 p-4">
              <h3 className="text-sm font-semibold text-[#F8FAFC]">Sample Interaction Flow</h3>
              <div className="space-y-2.5">
                {activeModalProject.sampleFlow.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-white/10 bg-[#080B18]/75 px-3.5 py-2.5 text-xs leading-relaxed text-[#CBD5E1]"
                  >
                    <span className="font-semibold text-[#22D3EE] mr-1.5">{step.speaker}:</span>
                    <span>{step.message}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
              <a
                href={buildMailtoUrl(
                  `Demo Enquiry: ${activeModalProject.title}`,
                  `Hello ${BUSINESS_CONFIG.businessName},\n\nI reviewed the "${activeModalProject.title}" demo and would like to discuss a similar automation.`
                )}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150"
              >
                Enquire via Email
              </a>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-[#CBD5E1] hover:text-[#F8FAFC] cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

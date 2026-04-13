import Link from 'next/link'
import { ArrowRight, Database, GraduationCap, Layers3, Workflow } from 'lucide-react'

import { featuredProjects, siteProfile, skills, socialLinks, tools } from '@/content/site'
import { formatDate } from '@/lib/format'
import { getPublishedJournalPosts } from '@/lib/journal'
import { HeroScene } from '@/components/hero-scene'
import { ToolStack } from '@/components/tool-stack'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const journalPosts = (await getPublishedJournalPosts()).slice(0, 3)

  return (
    <main className="pb-20">
      <section className="shell grid gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="space-y-8">
          <Badge variant="secondary" className="w-fit border border-cyan-400/20 bg-cyan-400/10 text-cyan-100">
            SETEC Institute • {siteProfile.studyPeriod}
          </Badge>
          <div className="space-y-5">
            <p className="eyebrow">MIS Student / Developer / System Builder</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
              {siteProfile.name}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              {siteProfile.intro}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {siteProfile.headline.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/journal">
              <Button className="rounded-full px-6">
                Read Journal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#projects">
              <Button variant="outline" className="rounded-full border-white/15 bg-transparent px-6 text-white hover:bg-white/5">
                View Featured Project
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="panel p-5">
              <GraduationCap className="mb-3 h-5 w-5 text-cyan-300" />
              <p className="text-sm text-slate-400">Education</p>
              <p className="mt-2 font-medium text-white">{siteProfile.school}</p>
            </div>
            <div className="panel p-5">
              <Database className="mb-3 h-5 w-5 text-cyan-300" />
              <p className="text-sm text-slate-400">Core Strength</p>
              <p className="mt-2 font-medium text-white">Practical data and system thinking</p>
            </div>
            <div className="panel p-5">
              <Workflow className="mb-3 h-5 w-5 text-cyan-300" />
              <p className="text-sm text-slate-400">Build Style</p>
              <p className="mt-2 font-medium text-white">Useful, structured, real-world solutions</p>
            </div>
          </div>
        </div>
        <HeroScene />
      </section>

      <section id="about" className="shell py-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="panel p-8">
            <p className="eyebrow">About</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Practical systems with a modern builder mindset
            </h2>
          </div>
          <div className="panel p-8">
            <p className="text-lg leading-8 text-slate-300">{siteProfile.about}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {siteProfile.focus.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="shell py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Skills</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Tools and disciplines I enjoy working with
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill) => (
            <article key={skill.name} className="panel p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/75">
                {skill.category}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{skill.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {skill.description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Tool Stack</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                A broader toolkit across app, database, cloud, and systems work
              </h3>
            </div>
          </div>
          <ToolStack tools={tools} />
        </div>
      </section>

      <section id="projects" className="shell py-12">
        <div className="space-y-6">
          {featuredProjects.map((project, index) => (
            <div key={project.title} className="panel overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[1fr_0.9fr]">
                <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
                  <p className="eyebrow">{index === 0 ? 'Featured Project' : 'Project Collaboration'}</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">
                    {project.title}
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-300">
                    {project.description}
                  </p>
                  <p className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm leading-7 text-cyan-50">
                    {project.outcome}
                  </p>
                </div>
                <div className="p-8">
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                      <p className="text-sm text-slate-400">Built for</p>
                      <p className="mt-2 text-lg font-medium text-white">
                        {project.builtFor} in {project.location}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                      <p className="text-sm text-slate-400">Stack</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                      <p className="flex items-center gap-2 text-sm text-slate-400">
                        <Layers3 className="h-4 w-4" />
                        {project.collaborators?.length ? 'Worked with' : 'Easy to update'}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        {project.collaborators?.length
                          ? project.collaborators.join(', ')
                          : 'The featured project content is isolated in a single content source, so adding more projects later is straightforward.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Journal</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Recent writing and working notes
            </h2>
          </div>
          <Link href="/journal" className="text-sm text-cyan-300 hover:text-cyan-100">
            See all posts
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {journalPosts.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.slug}`}
              className="panel group p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                <span>{post.tags[0] || 'Journal'}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white group-hover:text-cyan-200">
                {post.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="shell pt-12">
        <div className="panel flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-semibold text-white">{siteProfile.name}</p>
            <p className="mt-2 text-sm text-slate-400">
              MIS student, developer, and system builder focused on practical software.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}

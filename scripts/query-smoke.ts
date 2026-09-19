import { parse, evaluate } from 'groq-js';
import { seedDocuments } from './seed/content.ts';
import * as Q from '../src/lib/sanity/queries.ts';

async function run(name: string, query: string, params: Record<string, unknown> = {}) {
  try {
    const v = await evaluate(parse(query), { dataset: seedDocuments, params });
    const r = await v.get();
    return r;
  } catch (e) {
    console.log(`!! ${name}: ${(e as Error).message}`);
    return null;
  }
}

const home = await run('homepage', Q.homepageQuery) as any;
console.log('homepage.selectedWork.projects', home?.selectedWork?.projects?.map((p: any) => p.name));
console.log('homepage.services.items', home?.services?.items?.map((s: any) => s.name + ':' + s.homepageTechnologies?.map((t:any)=>t.name).join('/')));
console.log('homepage.team.devs', home?.team?.developers?.map((d: any) => d.name));
console.log('homepage.testimonials', home?.testimonials?.items?.map((t: any) => t.person));
console.log('homepage.insights', home?.insights?.articles?.map((a: any) => a.title.slice(0,30)));
console.log('homepage.featuredCase.project', home?.featuredCase?.project?.name, home?.featuredCase?.metrics?.length, home?.featuredCase?.project?.heroImage?.externalUrl?.slice(0,40));
console.log('hero stack', home?.hero?.visual?.stackTechnologies?.map((t:any)=>t.name));

const proj = await run('project', Q.projectBySlugQuery, { slug: 'meridian' }) as any;
console.log('project', proj?.name, 'client', proj?.client?.name, 'industry', proj?.industry?.name, 'next', proj?.nextProject?.name, 'blocks', proj?.caseStudy?.map((b:any)=>b._type).join(','));
console.log('project testimonial block', proj?.caseStudy?.find((b:any)=>b._type==='blockTestimonial')?.testimonial?.person);
console.log('project image', proj?.heroImage?.externalUrl?.slice(0,50), 'services', proj?.services?.map((s:any)=>s.name));
const proj2 = await run('project2', Q.projectBySlugQuery, { slug: 'cadence' }) as any;
console.log('cadence next (wrap)', proj2?.nextProject?.name);
const proj3 = await run('project3', Q.projectBySlugQuery, { slug: 'vessel' }) as any;
console.log('vessel next', proj3?.nextProject?.name, 'cta link', JSON.stringify(proj3?.caseStudy?.find((b:any)=>b._type==='blockCta')?.link));

const art = await run('article', Q.articleBySlugQuery, { slug: 'practical-llm-integration-patterns' }) as any;
console.log('article', art?.title?.slice(0,30), 'author', art?.author?.name, 'related', art?.relatedArticles?.map((a:any)=>a.title.slice(0,20)), 'cat', art?.category?.title);
const arts = await run('articles', Q.articlesQuery) as any;
console.log('articles', arts?.length, arts?.[0]?.author?.name);
const ins = await run('insightsPage', Q.insightsPageQuery) as any;
console.log('insights featured', ins?.featuredArticle?.title?.slice(0,30));
const studio = await run('studio', Q.studioPageQuery) as any;
console.log('studio devs', studio?.team?.developers?.map((d:any)=>d.name));
const nav = await run('nav', Q.navigationQuery) as any;
console.log('nav', nav?.mainItems?.map((l:any)=>l.label+'>'+l.internal?._type), nav?.legalItems?.map((l:any)=>l.internal?.slug));
const settings = await run('settings', Q.siteSettingsQuery) as any;
console.log('settings', settings?.studioName, settings?.newsletter?.heading);
const svcs = await run('services', Q.servicesQuery) as any;
console.log('services', svcs?.length, svcs?.[0]?.projects?.map((p:any)=>p.slug));
const slugs = await run('slugs', Q.projectSlugsQuery);
console.log('slugs', slugs);
const nf = await run('404', Q.notFoundPageQuery) as any;
console.log('404 links', nf?.links?.map((l:any)=>l.label));
const legal = await run('legal', Q.legalPageBySlugQuery, { slug: 'terms' }) as any;
console.log('legal', legal?.title, legal?.body?.length);
const faqs = await run('faqs', Q.faqsQuery) as any; console.log('faqs', faqs?.length);
const techs = await run('techs', Q.technologiesQuery) as any; console.log('techs', techs?.length);
const start = await run('start', Q.startProjectPageQuery) as any; console.log('start', start?.projectTypes?.length, start?.faq?.enabled);

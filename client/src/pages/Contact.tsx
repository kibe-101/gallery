import { ReactLenis } from "@studio-freight/react-lenis";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassButton } from "@/components/GlassButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle, Instagram, Music } from "lucide-react";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Form validation schema
const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  serviceType: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    },
  });

  async function onSubmit(data: QuoteFormData) {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Submit to both Formspree endpoints simultaneously
      const [firstResponse, secondResponse] = await Promise.allSettled([
        fetch('https://formspree.io/f/mdalewzb', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(data),
        }),
        fetch('https://formspree.io/f/xojnpenj', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(data),
        })
      ]);

      // Check if at least one submission succeeded
      const firstSuccess = firstResponse.status === 'fulfilled' && firstResponse.value.ok;
      const secondSuccess = secondResponse.status === 'fulfilled' && secondResponse.value.ok;
      
      if (firstSuccess || secondSuccess) {
        setSubmitStatus('success');
        form.reset();
      } else {
        // Both submissions failed, get error details
        let errorMessage = 'Submission failed';
        
        if (firstResponse.status === 'rejected') {
          errorMessage = firstResponse.reason?.message || 'First endpoint failed';
        } else if (!firstResponse.value.ok) {
          try {
            const errorData = await firstResponse.value.json();
            errorMessage = errorData.error || 'First endpoint failed';
          } catch {
            errorMessage = 'First endpoint failed';
          }
        }
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ReactLenis root>
      <div className="bg-background min-h-screen text-foreground relative overflow-hidden">
        {/* Abstract background gradient blob */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <Navigation />

        <div className="container mx-auto px-6 pt-40 pb-20 flex flex-col lg:flex-row gap-20">
          
          <div className="lg:w-1/2">
            <SectionHeading title="Request a Quote" subtitle="Contact" />
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-md mb-12">
              Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-8 font-mono text-sm">
              <div>
                <span className="block text-white/30 uppercase tracking-widest mb-2">Email</span>
                <a href="mailto:murungibrenda1@gmail.com" className="text-white hover:text-white/70 transition-colors">murungibrenda1@gmail.com</a>
              </div>
              <div>
                <span className="block text-white/30 uppercase tracking-widest mb-2">Phone</span>
                <a href="tel:+254710110705" className="text-white hover:text-white/70 transition-colors">+254 710 110 705</a>
              </div>
              
              <div>
                <span className="block text-white/30 uppercase tracking-widest mb-2">Socials</span>
                <div className="flex gap-6 text-white/60">
                  <a href="https://www.instagram.com/estateaerial_co?igsh=ZGpreHoyN3l2NHo%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <Instagram size={18} />
                    Instagram
                  </a>
                  <a href="https://www.tiktok.com/@estateaerial_co?_r=1&_t=ZS-94A4s22cnPI" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <Music size={18} />
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="glass-panel p-8 md:p-12 rounded-3xl">
              {/* Success Message */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <p className="text-green-300 text-sm font-light">
                      Thank you — your request has been received.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-300 text-sm font-light">
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Hidden honeypot field for spam protection */}
                  <input
                    type="text"
                    name="_gotcha"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs uppercase tracking-widest text-white/40">Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Name" 
                              {...field} 
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 h-12 font-light rounded-none"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs uppercase tracking-widest text-white/40">Email *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="email@example.com" 
                              type="email"
                              {...field} 
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 h-12 font-light rounded-none"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs uppercase tracking-widest text-white/40">Phone *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+254 710 110 705" 
                              type="tel"
                              {...field} 
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 h-12 font-light rounded-none"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs uppercase tracking-widest text-white/40">Services Offered *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                            <FormControl>
                              <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-white/30 h-12 font-light rounded-none">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-zinc-900 border-white/10 text-white">
                              <SelectItem value="drone-cinematography">Drone Cinematography</SelectItem>
                              <SelectItem value="aerial-photography">Aerial Photography</SelectItem>
                              <SelectItem value="360-virtual-tours">360° Virtual Tours</SelectItem>
                              <SelectItem value="real-estate-photography">Real Estate Photography</SelectItem>
                              <SelectItem value="architectural-photography">Architectural Photography</SelectItem>
                              <SelectItem value="custom-project">Custom Project</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs uppercase tracking-widest text-white/40">Project Details *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project, timeline, and specific requirements..." 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 min-h-[150px] font-light resize-none rounded-none"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <GlassButton 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Request a Quote"
                    )}
                  </GlassButton>
                </form>
              </Form>
            </div>
          </motion.div>

        </div>
        <Footer />
      </div>
    </ReactLenis>
  );
}

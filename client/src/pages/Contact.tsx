import { ReactLenis } from "@studio-freight/react-lenis";
import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassButton } from "@/components/GlassButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function Contact() {
  const createInquiry = useCreateInquiry();
  
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: InsertInquiry) {
    createInquiry.mutate(data, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <ReactLenis root>
      <div className="bg-background min-h-screen text-foreground relative overflow-hidden">
        {/* Abstract background gradient blob */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <Navigation />

        <div className="container mx-auto px-6 pt-40 pb-20 flex flex-col lg:flex-row gap-20">
          
          <div className="lg:w-1/2">
            <SectionHeading title="Let's Collaborate" subtitle="Contact" />
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-md mb-12">
              Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-8 font-mono text-sm">
              <div>
                <span className="block text-white/30 uppercase tracking-widest mb-2">Email</span>
                <a href="mailto:hello@aether.studio" className="text-white hover:text-white/70 transition-colors">hello@aether.studio</a>
              </div>
              <div>
                <span className="block text-white/30 uppercase tracking-widest mb-2">Studio</span>
                <p className="text-white">142 Silvertower Blvd<br/>Los Angeles, CA 90012</p>
              </div>
              <div>
                <span className="block text-white/30 uppercase tracking-widest mb-2">Socials</span>
                <div className="flex gap-4 text-white/60">
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs uppercase tracking-widest text-white/40">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 h-12 font-light"
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
                        <FormLabel className="font-mono text-xs uppercase tracking-widest text-white/40">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 h-12 font-light"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs uppercase tracking-widest text-white/40">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project..." 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 min-h-[150px] font-light resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <GlassButton 
                    type="submit" 
                    className="w-full"
                    disabled={createInquiry.isPending}
                  >
                    {createInquiry.isPending ? "Sending..." : "Send Message"}
                  </GlassButton>
                </form>
              </Form>
            </div>
          </motion.div>

        </div>
      </div>
    </ReactLenis>
  );
}

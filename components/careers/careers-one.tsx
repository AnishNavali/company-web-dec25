"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  User,
  Mail,
  Phone,
  Briefcase,
  X,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/navbar/navbar";

// --- Hero Section ---
export const CarrerSecOne = () => {
  const floatingAnimation: Variants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -15, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative pt-32 pb-12 overflow-hidden px-4">
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.div variants={floatingAnimation} initial="hidden" animate="visible">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-black tracking-tight leading-tight overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {"Join Our Team".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, rotateY: 90 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl font-medium text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Build the future with us. We&apos;re looking for passionate
            individuals who want to make a difference in the world of
            technology.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// --- Form Logic & Components ---

interface FormDataState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  customPosition?: string;
  resume: File | null;
  noticePeriod: Date | undefined;
  coverLetter: string;
  skills: string[];
  experience: string;
  linkedinUrl: string;
  portfolioUrl: string;
  agreedToTerms: boolean;
}

export function CarrerSecTwo() {
  const [formData, setFormData] = useState<FormDataState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
    noticePeriod: undefined,
    coverLetter: "",
    skills: [],
    experience: "",
    linkedinUrl: "",
    portfolioUrl: "",
    agreedToTerms: false,
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const positions = ["Technical", "Non-Technical", "Others"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardReveal: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const floatingCard: Variants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleInputChange = (field: keyof FormDataState, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange("resume", file);
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      handleInputChange("skills", [...formData.skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    handleInputChange(
      "skills",
      formData.skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.position) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("position", formData.position === "Others" ? (formData.customPosition || "") : formData.position);
      data.append("experience", formData.experience);
      data.append("skills", formData.skills.join(", "));
      data.append("linkedinUrl", formData.linkedinUrl);
      data.append("portfolioUrl", formData.portfolioUrl);
      data.append("coverLetter", formData.coverLetter);
      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      // Updated fetch URL to match your route path
      const res = await fetch("/api/contact-form/career", { 
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Submission failed");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.position &&
      formData.agreedToTerms
    );
  };

  return (
    <section className="pb-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div className="relative">
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {/* Personal Information Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white rounded-[2rem] p-8 shadow-sm border-none hover:shadow-lg transition-all duration-300"
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-gray-50 rounded-2xl">
                          <User className="h-6 w-6 text-black" />
                        </div>
                        <h3 className="text-2xl font-bold text-black">
                          Personal Information
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName" className="text-black font-medium mb-2 block">First Name *</Label>
                          <div className="relative">
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange("firstName", e.target.value)}
                              className="pl-11 bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl py-6 text-black placeholder:text-gray-400"
                              placeholder="John"
                            />
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-black font-medium mb-2 block">Last Name *</Label>
                          <div className="relative">
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                              className="pl-11 bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl py-6 text-black placeholder:text-gray-400"
                              placeholder="Doe"
                            />
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Contact Details Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white rounded-[2rem] p-8 shadow-sm border-none hover:shadow-lg transition-all duration-300"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-gray-50 rounded-2xl">
                          <Mail className="h-6 w-6 text-black" />
                        </div>
                        <h3 className="text-2xl font-bold text-black">Contact Details</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email" className="text-black font-medium mb-2 block">Email Address *</Label>
                          <div className="relative">
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className="pl-11 bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl py-6 text-black placeholder:text-gray-400"
                              placeholder="john@example.com"
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-black font-medium mb-2 block">Phone Number *</Label>
                          <div className="relative">
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className="pl-11 bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl py-6 text-black placeholder:text-gray-400"
                              placeholder="+1 (555) 000-0000"
                            />
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Position Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white rounded-[2rem] p-8 shadow-sm border-none hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-gray-50 rounded-2xl">
                        <Briefcase className="h-6 w-6 text-black" />
                      </div>
                      <h3 className="text-2xl font-bold text-black">Position & Experience</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="position" className="text-black font-medium mb-2 block">Position *</Label>
                        <Select value={formData.position} onValueChange={(val) => handleInputChange("position", val)}>
                          <SelectTrigger className="bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl py-6 px-4 text-black">
                            <SelectValue placeholder="Select Position" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-100">
                            {positions.map((pos) => (
                              <SelectItem key={pos} value={pos} className="hover:bg-gray-50">{pos}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="experience" className="text-black font-medium mb-2 block">Experience *</Label>
                        <Select value={formData.experience} onValueChange={(val) => handleInputChange("experience", val)}>
                          <SelectTrigger className="bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl py-6 px-4 text-black">
                            <SelectValue placeholder="Years of Experience" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-100">
                            <SelectItem value="0-1" className="hover:bg-gray-50">0-1 years</SelectItem>
                            <SelectItem value="1-3" className="hover:bg-gray-50">1-3 years</SelectItem>
                            <SelectItem value="3-5" className="hover:bg-gray-50">3-5 years</SelectItem>
                            <SelectItem value="5+" className="hover:bg-gray-50">5+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {formData.position === "Others" && (
                      <div className="mb-6">
                         <Label htmlFor="customPosition" className="text-black font-medium mb-2 block">Specify Position</Label>
                         <Input 
                           id="customPosition"
                           value={formData.customPosition || ""}
                           onChange={(e) => handleInputChange("customPosition", e.target.value)}
                           className="bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl py-6 text-black"
                           placeholder="e.g. Product Manager"
                         />
                      </div>
                    )}

                    {/* Skills Input */}
                    <div className="mb-6">
                      <Label className="text-black font-medium mb-2 block">Skills</Label>
                      <div className="flex gap-2 mb-3">
                        <Input 
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                          placeholder="Type skill and press Enter"
                          className="bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl py-6 text-black placeholder:text-gray-400"
                        />
                        <Button type="button" onClick={addSkill} className="rounded-xl h-auto bg-black text-white hover:bg-gray-800 px-6">Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                          <Badge key={skill} className="bg-gray-100 text-black border-gray-200 hover:bg-gray-200 px-3 py-1 rounded-lg gap-2 text-sm font-normal">
                            {skill}
                            <X className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors" onClick={() => removeSkill(skill)} />
                          </Badge>
                        ))}
                      </div>
                    </div>

                     {/* Resume Upload */}
                    <div>
                      <Label className="text-black font-medium mb-2 block">Resume (PDF/DOC) *</Label>
                      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-gray-400 hover:bg-gray-50 transition-colors bg-white">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium mb-1">
                          {formData.resume ? formData.resume.name : "Click to upload resume"}
                        </p>
                        <Input 
                          id="resume-upload" 
                          type="file" 
                          accept=".pdf,.doc,.docx" 
                          onChange={handleFileUpload} 
                          className="hidden" 
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => document.getElementById('resume-upload')?.click()}
                          className="mt-2 border-gray-200 text-black hover:bg-gray-50 rounded-lg"
                        >
                          Select File
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Terms & Submit */}
                   <motion.div
                    variants={cardReveal}
                    className="bg-white rounded-[2rem] p-8 shadow-sm border-none hover:shadow-lg"
                  >
                    <div className="flex items-start gap-3 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <Checkbox 
                        id="terms" 
                        checked={formData.agreedToTerms} 
                        onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked)} 
                        className="mt-1 border-gray-400 data-[state=checked]:bg-black data-[state=checked]:border-black"
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed font-normal">
                        I agree to the terms and conditions and consent to the processing of my personal data for recruitment purposes.
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={!isFormValid() || isSubmitting}
                      className="w-full h-14 text-lg font-semibold rounded-xl bg-black text-white hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Submit Application <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </motion.div>

                </motion.form>
              </motion.div>
            ) : (
              // Success State
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-white rounded-[2rem] shadow-xl border border-gray-100"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">Application Submitted!</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
                  Thank you for applying. We have received your details and will get back to you shortly.
                </p>
                <Button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                        firstName: "", lastName: "", email: "", phone: "", position: "",
                        resume: null, noticePeriod: undefined, coverLetter: "", skills: [],
                        experience: "", linkedinUrl: "", portfolioUrl: "", agreedToTerms: false,
                    });
                  }}
                  variant="outline"
                  className="h-12 px-8 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:border-black hover:text-black"
                >
                  Submit Another Application
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// --- Main Page Component ---

export default function CareersCombo() {
  return (
    <div className="bg-[#FFFAF7] min-h-screen relative overflow-x-hidden font-sans">
      
      {/* Theme Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
         <div className="absolute top-10 left-0 w-full h-1 bg-gray-400"></div>
         <div className="absolute bottom-10 left-0 w-full h-1 bg-gray-400"></div>
         <div className="absolute top-0 left-10 h-full w-1 bg-gray-400"></div>
         <div className="absolute top-0 right-10 h-full w-1 bg-gray-400"></div>
      </div>

      <div className="absolute top-8 left-0 right-0 z-50 flex justify-center">
          <Navbar />
      </div>

      <CarrerSecOne />
      <CarrerSecTwo />
    </div>
  );
}


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { PlusIcon, MinusIcon, UsersIcon, SendIcon } from "lucide-react";
import FamilyMemberCard from "./FamilyMemberCard";

const memberSchema = z.object({
  nickname: z.string().min(2, "Nickname must be at least 2 characters"),
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be less than 120"),
  phValue: z.number().min(6.5, "pH must be at least 6.5").max(9.5, "pH must be at most 9.5"),
});

const formSchema = z.object({
  familyName: z.string().min(2, "Family name must be at least 2 characters"),
  members: z.array(memberSchema).min(1, "At least one family member is required").max(6, "Maximum 6 family members allowed"),
});

type MemberValues = z.infer<typeof memberSchema>;
type FormValues = z.infer<typeof formSchema>;

const FamilyProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      familyName: "",
      members: [
        { nickname: "", age: 30, phValue: 7.4 }
      ],
    },
  });

  const { members } = form.watch();

  const addMember = () => {
    if (members.length < 6) {
      const updatedMembers = [...members, { nickname: "", age: 30, phValue: 7.4 }];
      form.setValue("members", updatedMembers);
    } else {
      toast.error("Maximum 6 family members allowed");
    }
  };

  const removeMember = (index: number) => {
    if (members.length > 1) {
      const updatedMembers = [...members];
      updatedMembers.splice(index, 1);
      form.setValue("members", updatedMembers);
    } else {
      toast.error("At least one family member is required");
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      // Simulating API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Family profile data:", values);
      toast.success("Family profile created successfully!");
      
      // In a real app, you would send this data to your PCB board here
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Family profile creation error:", error);
      toast.error("Failed to create family profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 animate-fade-in">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <UsersIcon className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-medium text-center mb-1">Create Your Family Profile</h1>
        <p className="text-muted-foreground text-center">
          Set up your family members and their preferred water settings
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-6">
              <FormField
                control={form.control}
                name="familyName"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel>Family Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Smiths" className="rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Family Members</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full h-8 w-8 p-0"
                    onClick={addMember}
                    disabled={members.length >= 6}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {members.map((member, index) => (
                    <FamilyMemberCard
                      key={index}
                      index={index}
                      form={form}
                      onRemove={() => removeMember(index)}
                      showRemoveButton={members.length > 1}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="px-6 h-12 rounded-xl text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                "Creating Profile..."
              ) : (
                <>
                  <span>Create Profile</span>
                  <SendIcon className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FamilyProfileForm;

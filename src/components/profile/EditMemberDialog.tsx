import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { UserIcon } from "lucide-react";
import { FamilyMember } from "@/contexts/FamilyContext";

interface EditMemberDialogProps {
  member: FamilyMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (member: FamilyMember) => void;
}

const formSchema = z.object({
  nickname: z.string().min(2, "Nickname must be at least 2 characters"),
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be less than 120"),
  phValue: z.number().min(6.5, "pH must be at least 6.5").max(9.5, "pH must be at most 9.5"),
});

type FormValues = z.infer<typeof formSchema>;

const EditMemberDialog: React.FC<EditMemberDialogProps> = ({
  member,
  open,
  onOpenChange,
  onSave
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: member.nickname,
      age: member.age,
      phValue: member.phValue,
    },
  });

  const onSubmit = (values: FormValues) => {
    const updatedMember = {
      ...member,
      ...values
    };
    onSave(updatedMember);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" /> 
            Edit Family Member
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mom, Dad, Lily" className="rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <div className="flex items-center space-x-4">
                    <Input 
                      type="number" 
                      className="w-20 rounded-xl" 
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value}
                      min={1}
                      max={120}
                    />
                    <div className="flex-1">
                      <Slider
                        min={1}
                        max={120}
                        step={1}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phValue"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Desired pH Level</FormLabel>
                    <span className="text-sm font-medium">{field.value.toFixed(1)}</span>
                  </div>
                  <div className="pt-2">
                    <Slider
                      min={6.5}
                      max={9.5}
                      step={0.1}
                      value={[field.value]}
                      onValueChange={(values) => field.onChange(values[0])}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Acidic (6.5)</span>
                      <span>Neutral (7.4)</span>
                      <span>Alkaline (9.5)</span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberDialog;

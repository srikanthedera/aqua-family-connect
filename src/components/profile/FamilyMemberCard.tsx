
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MinusIcon } from "lucide-react";

interface FamilyMemberCardProps {
  index: number;
  form: UseFormReturn<any>;
  onRemove: () => void;
  showRemoveButton: boolean;
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ 
  index, 
  form, 
  onRemove,
  showRemoveButton
}) => {
  return (
    <Card className="relative overflow-hidden border border-border/50 shadow-sm animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-muted-foreground">Member {index + 1}</h4>
          {showRemoveButton && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name={`members.${index}.nickname`}
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
            name={`members.${index}.age`}
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
            name={`members.${index}.phValue`}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyMemberCard;

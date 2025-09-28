import React, { useState, createContext, useContext } from "react";
import { motion } from "framer-motion";

// Create context for tabs
const TabsContext = createContext();

// Utility function for className merging (simplified version)
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Main Tabs component
const Tabs = ({ defaultValue, className, children, ...props }) => {
  const [activeValue, setActiveValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsList component
const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

TabsList.displayName = "TabsList";

// TabsTrigger component
const TabsTrigger = React.forwardRef(
  ({ className, value, onClick, children, ...props }, ref) => {
    const { activeValue, setActiveValue } = useContext(TabsContext);
    const isActive = activeValue === value;

    const handleClick = (e) => {
      setActiveValue(value);
      if (onClick) onClick(e);
    };

    return (
      <motion.button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive
            ? "bg-background text-foreground shadow"
            : "hover:bg-muted-foreground/10",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

// TabsContent component
const TabsContent = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { activeValue } = useContext(TabsContext);

    if (activeValue !== value) return null;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

TabsContent.displayName = "TabsContent";

// Demo component showing usage
const TabsDemo = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = ["all", "react", "javascript", "css", "html"];

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Custom Tabs Demo</h2>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="flex justify-center mb-8 overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setActiveCategory(category)}
              className="capitalize"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="p-6 rounded-lg bg-muted/50 border">
              <h3 className="text-lg font-semibold mb-2 capitalize">
                {category} Content
              </h3>
              <p className="text-muted-foreground">
                This is the content for the {category} tab. The active category
                is: {activeCategory}
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsDemo;
export { Tabs, TabsList, TabsTrigger, TabsContent };

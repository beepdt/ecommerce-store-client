import { LinkedinIcon } from "lucide-react"


const Footer = () => {
    return(
        <footer className="border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main content */}
        <div className="flex flex-col items-center space-y-8">
          
          {/* Developer info card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r  rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-foreground/10 dark:bg-background/10 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              
              {/* Crafted with love indicator */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2 text-sm  dark:text-background">
                  <span>Crafted with</span>
                  <span className="text-red-500 animate-pulse">♥</span>
                  <span>by</span>
                </div>
              </div>
              
              {/* Developer name */}
              <p className="text-2xl md:text-3xl  text-center dark:text-background bg-clip-text  mb-6">
                Deeptangshu Bhattacharjee
              </p>
              
              {/* LinkedIn connection */}
              <div className="flex items-center justify-center">
                <a 
                  href="https://linkedin.com/in/deeptangshubhattacharjee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <LinkedinIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium">Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom section */}
          
        </div>
        
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-12 py-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            
            {/* Copyright */}
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Deeptangshu Bhattacharjee. All rights reserved.
            </div>
            
            {/* Tech stack or additional links */}
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Built with</span>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-foreground dark:bg-blue-900 text-blue-200 dark:text-background rounded">NextJs</span>
              </div>
            </div>
          </div>
    </footer>
    )
}

export default Footer